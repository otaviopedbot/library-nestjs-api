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
            await this.rentsRepository.exist({
                where: {
                    user_id: data.user_id,
                    book_id: data.book_id
                },
            })
        ) {
            throw new BadRequestException('book already rented by this user');
        }

        const rent = this.rentsRepository.create(data)

        return this.rentsRepository.save(rent)
    }

    async list() {
        return this.rentsRepository.find()
    }

    async show(id: number) {
        await this.exists(id);

        return this.rentsRepository.findBy({
            id
        })
    }

    async update(
        id: number,
        { date, user_id, book_id }: CreateRentDTO
    ) {

        await this.exists(id)

        await this.rentsRepository.update(id, {
            date,
            user_id,
            book_id
        });

        return this.show(id)
    }

    async updatePartial(
        id: number,
        { date, user_id, book_id }: UpdatePatchRentDTO
    ) {

        await this.exists(id);

        const data: any = {};

        if (date) {
            data.date = date;
        }

        if (user_id) {
            data.user_id = user_id;
        }

        if (book_id) {
            data.book_id = book_id;
        }
        
        await this.rentsRepository.update(id, data);

        return this.show(id);
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