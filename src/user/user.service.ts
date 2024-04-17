import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcryptjs'
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) { }

    async create(data: CreateUserDTO) {

        if (
            await this.usersRepository.exist({
                where: {
                    email: data.email,
                    username: data.username
                },
            })
        ) {
            throw new BadRequestException('e-mail or username already in use');
        }

        const salt = await bcrypt.genSalt(); true

        data.password = await bcrypt.hash(data.password, salt)

        const user = this.usersRepository.create(data)

        return this.usersRepository.save(user)
    }

    async list() {
        return this.usersRepository.find()
    }

    async show(id: number) {
        await this.exists(id);

        const user = await this.usersRepository.findOne({
            where: { id: id },
            relations: ["favorites", "reviews", "rents"]
        })
        return user
    }

    async updatePartial(
        id: number,
        { complete_name, phone, address, username, email, password, image, details }: UpdatePatchUserDTO
    ) {
        try {
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

            if (password) {
                const salt = await bcrypt.genSalt();
                data.password = await bcrypt.hash(password, salt);
            }

            if (image) {
                data.image = image;
            }

            if (details) {
                data.details = details;
            }

            await this.usersRepository.update(id, data);

            return this.show(id);
            
        } catch (err) {
            throw err
        }
    }

    async delete(id: number) {
        await this.exists(id);

        await this.usersRepository.delete(id);

        return true;
    }

    async exists(id: number) {
        if (
            !(await this.usersRepository.exists({
                where: {
                    id,
                },
            }))
        ) {
            throw new NotFoundException(`the user with id ${id} does not exist`);
        }
    }

}