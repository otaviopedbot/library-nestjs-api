import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookDTO } from "./dto/create-book.dto";
import { Repository } from "typeorm";
import { Book } from "./entity/book.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorService } from "../author/author.service";
import { UpdatePatchBookDTO } from "./dto/update-patch-book.dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";


@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
        private readonly authorService: AuthorService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    async create(data: CreateBookDTO, cover) {
        try {
            const existingBook = await this.booksRepository.findOne({
                where: {
                    title: data.title,
                },
            });
            if (existingBook) {
                throw new BadRequestException('Title already exists');
            }

            await this.authorService.exists(data.author_id)

            const book = this.booksRepository.create(data);
            book.cover = process.env.CLOUDINARY_DEFAULT_BOOK_IMG

            if (cover) {
                const coverPath = await this.cloudinaryService.uploadFile(cover)
                book.cover = coverPath.url
            }

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

        return this.booksRepository.findOne({
            where: { id: id },
            relations: ["author", "rents", "favorites", "reviews"]
        })
    }

    async updatePartial(
        id: number,
        { title, page, quantity, author_id, synopsis }: UpdatePatchBookDTO
    ) {

        try {

            await this.exists(id);

            await this.authorService.exists(author_id)

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

            // if (cover) {
            //     data.cover = cover;
            // }

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

    async addBookQuantity(id: number) {
        try {

            await this.exists(id);

            const book = await this.booksRepository.findOne({
                where: { id: id }
            })

            const data: any = {};

            data.quantity = book.quantity += 1

            await this.booksRepository.update(id, data);

        } catch (err) {
            throw err
        }
    }

    async removeBookQuantity(id: number) {
        try {

            await this.exists(id);

            const book = await this.booksRepository.findOne({
                where: { id: id }
            })

            const data: any = {};

            data.quantity = book.quantity -= 1

            await this.booksRepository.update(id, data);

        } catch (err) {
            throw err
        }
    }

}