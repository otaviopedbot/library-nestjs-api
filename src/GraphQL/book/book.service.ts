import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookInput } from "./inputs/create-book.input";
import { Repository } from "typeorm";
import { Book } from "./entity/book.entity"
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorService } from "../author/author.service";
import { UpdatePatchBookInput } from "./inputs/update-patch-book.input";
import { CloudinaryService } from "../cloudinary/cloudinary.service";


@Injectable()
export class BookService {

    constructor(
        @InjectRepository(Book)
        private booksRepository: Repository<Book>,
        private readonly authorService: AuthorService,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    async create(data: CreateBookInput) {
        try {
            if (await this.booksRepository.exists({ where: { title: data.title } })) {
                throw new BadRequestException('Title already in use');
            }

            await this.authorService.exist(data.author_id)

            const book = this.booksRepository.create(data);

            return this.booksRepository.save(book);

        } catch (err) {
            throw err;
        }
    }

    async list() {
        return this.booksRepository.find({
            relations: ["author"]
        })
    }

    async show(id: number) {
        await this.exist(id);

        return this.booksRepository.findOne({
            where: { id: id },
            relations: ["author", "rents", "favorites", "reviews.user"]
        })
    }

    async updatePartial(
        id: number,
        { title, page, quantity, author_id, synopsis }: UpdatePatchBookInput
    ) {

        try {

            await this.exist(id);

            await this.authorService.exist(author_id)

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
                data.author_id = author_id;
            }

            if (synopsis) {
                data.synopsis = synopsis;
            }

            await this.booksRepository.update(id, data);

            return this.show(id);

        } catch (err) {
            throw err
        }
    }

    async updateCover(
        id,
        cover
    ) {
        try {

            const oldBook = await this.show(id);

            const data: any = {};

            const regex = /\/([^\/]+)\.[^\/]+$/;
            const match = oldBook.cover.match(regex);
            const oldCoverId = match[1];

            if (cover) {
                if (oldCoverId != process.env.CLOUDINARY_DEFAULT_USER_IMG_ID) {
                    await this.cloudinaryService.deleteFile(oldCoverId)
                    const newCover = await this.cloudinaryService.uploadFile(cover)
                    data.cover = newCover.url
                }
                else {
                    const newCover = await this.cloudinaryService.uploadFile(cover)
                    data.cover = newCover.url
                }
            }

            await this.booksRepository.update(id, data);

            return this.show(id);

        } catch (err) {
            throw err
        }
    }

    async delete(id: number) {
        await this.exist(id);

        await this.booksRepository.delete(id);

        return true;
    }

    async exist(id: number) {
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

            await this.exist(id);

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

            await this.exist(id);

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