import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookDTO } from "./dto/create-book.dto";
import { Repository } from "typeorm";
import { Book } from "./entity/book.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorService } from "../author/author.service";
import { UpdatePatchBookDTO } from "./dto/update-patch-book.dto";


@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
        private readonly authorService: AuthorService
    ) { }

    async create(data: CreateBookDTO) {
        try {
            const existingBook = await this.booksRepository.findOne({
                where: {
                    title: data.title,
                },
            });
            if (existingBook) {
                throw new BadRequestException('Title already exists');
            }

            await this.authorService.exists(data.author_id);

            const book = this.booksRepository.create(data);

            return this.booksRepository.save(book);

        } catch (err) {
            throw err;
        }
    }

    async list() {
        return this.booksRepository.find()
    }

    async show(id: number) {
        await this.exists(id);

        return this.booksRepository.findOneBy({
            id
        })
    }

    async updatePartial(
        id: number,
        { title, page, quantity, author_id, synopsis, cover }: UpdatePatchBookDTO
    ) {

        try {

            await this.exists(id);

            await this.authorService.show(author_id)

            const data: any = {};

            if (title) {
                data.title = title;
            }

            if (page) {
                data.page = page;
            }

            if (quantity) {
                data.quantity = quantity;
            }

            if (author_id) {
                data.authorId = author_id;
            }

            if (synopsis) {
                data.synopsis = synopsis;
            }

            if (cover) {
                data.cover = cover;
            }

            await this.booksRepository.update(id, data);

            return this.show(id);
        } catch (err) {
            throw err
        }
    }

    async delete(id: number) {
        await this.exists(id);

        await this.booksRepository.delete(id);

        return true;
    }

    async exists(id: number) {
        if (
            !(await this.booksRepository.exists({
                where: {
                    id,
                },
            }))
        ) {
            throw new NotFoundException(`the book with id ${id} does not exist`);
        }
    }

}