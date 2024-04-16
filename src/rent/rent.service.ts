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
                    email: data.email,
                    username: data.username
                },
            })
        ) {
            throw new BadRequestException('e-mail or username already in use');
        }



        const user = this.rentsRepository.create(data)

        return this.rentsRepository.save(user)
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
        { complete_name, phone, address, username, email, password }: CreateRentDTO
    ) {

        await this.exists(id)

        await this.rentsRepository.update(id, {
            complete_name,
            phone,
            address,
            username,
            email,
            password
        });

        return this.show(id)
    }

    async updatePartial(
        id: number,
        { complete_name, phone, address, username, email, password }: UpdatePatchRentDTO
    ) {

        await this.exists(id);

        const data: any = {};

        if (complete_name) {
            data.complete_name = complete_name;
        }

        if (phone) {
            data.phone = phone;
        }

        if (address) {
            data.address = address;
        }

        if (username) {
            data.username = username;
        }

        if (email) {
            data.email = email;
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