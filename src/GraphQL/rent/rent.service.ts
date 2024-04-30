import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRentDTO } from "./inputs/create-rent.dto";
import { Rent } from "./entity/rent.entity";
import { UpdatePatchRentDTO } from "./inputs/update-patch-rent.dto";
import { UserService } from "../user/user.service";
import { BookService } from "../book/book.service";


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
                    book_id: data.book_id,
                    finished_in: ""
                },
            })
        ) {
            throw new BadRequestException('book already rented by this user');
        }

        const rent = this.rentsRepository.create(data)

        await this.bookService.exist(data.book_id)

        await this.userService.exist(data.user_id)

        const book = await this.bookService.show(data.book_id)

        if (book.quantity == 0) {
            throw new BadRequestException('book not available');
        }

        await this.bookService.removeBookQuantity(data.book_id)

        return this.rentsRepository.save(rent)
    }

    async list() {
        return await this.rentsRepository.find({
            where: { finished_in: '' },

        })
    }

    async show(id: number) {
        await this.exist(id);

        return await this.rentsRepository.findOne({
            where: { id: id },
            relations: ["book", "user"]
        })
    }

    async updatePartial(
        id: number,
        { user_id, book_id }: UpdatePatchRentDTO
    ) {

        try {
            await this.exist(id);

            await this.userService.exist(user_id)

            await this.bookService.exist(book_id)

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

    async finish(id: number) {
        try {
            const rent = await this.show(id);

            const data: any = {};
            const time = new Date();

            data.finished_in = time;

            await this.bookService.addBookQuantity(rent.book_id)

            await this.rentsRepository.update(id, data);

            return `The rent with id ${id} was finished`;
        } catch (err) {
            throw err
        }
    }

    async exist(id: number) {
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