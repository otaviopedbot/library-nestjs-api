import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRentDTO } from "./dto/create-rent.dto";
import { Rent } from "./entity/rent.entity";
import { UpdatePatchRentDTO } from "./dto/update-patch-rent.dto";
import { UserService } from "src/user/user.service";
import { BookService } from "src/book/book.service";


@Injectable()
export class RentService {

    constructor(
        @InjectRepository(Rent)
        private rentsRepository: Repository<Rent>,
        private readonly userService: UserService,
        private readonly bookService: BookService
    ) { }

    async create(data: CreateRentDTO) {

        if (
            await this.rentsRepository.exists({
                where: {
                    user_id: data.user_id,
                    book_id: data.book_id
                },
            })
        ) {
            throw new BadRequestException('book already rented by this user');
        }

        const rent = this.rentsRepository.create(data)

        if (!rent.book) {
            return `the book with id ${data.book_id} does not exist`
        }

        if (!rent.user) {
            return `the user with id ${data.user_id} does not exist`
        }

        return this.rentsRepository.save(rent)
    }

    async list() {
        return this.rentsRepository.find()
    }

    async show(id: number) {
        await this.exists(id);

        return this.rentsRepository.findOne({
            where: { id: id },
            relations: ["book", "user"]
        })
    }

    async updatePartial(
        id: number,
        { user_id, book_id }: UpdatePatchRentDTO
    ) {

        try {
            await this.exists(id);

            await this.userService.exists(user_id)

            await this.bookService.exists(book_id)

            const data: any = {};

            if (user_id) {
                data.user_id = user_id;
            }

            if (book_id) {
                data.book_id = book_id;
            }

            await this.rentsRepository.update(id, data);

            return this.show(id);
        } catch (err) {
            throw err
        }
    }

    async delete(id: number) {
        await this.exists(id);

        await this.rentsRepository.delete(id);

        return true;
    }

    async exists(id: number) {
        if (
            !(await this.rentsRepository.exists({
                where: {
                    id,
                },
            }))
        ) {
            throw new NotFoundException(`the rent with id ${id} does not exist`);
        }
    }

}