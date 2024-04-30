import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserInput } from "../GraphQL/user/inputs/create-user.input";
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcryptjs'
import { UpdatePatchUserInput } from "../GraphQL/user/inputs/update-patch-user.input";
import { CloudinaryService } from "../cloudinary/cloudinary.service";



@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    async create(data: CreateUserInput) {

        if (
            await this.usersRepository.exists({
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

        data.image = process.env.CLOUDINARY_DEFAULT_USER_IMG

        const user = this.usersRepository.create(data)

        return this.usersRepository.save(user)
    }

    async list() {
        return this.usersRepository.find()
    }

    async show(id: number) {
        await this.exist(id);

        const user = await this.usersRepository.findOne({
            where: { id: id },
            relations: ["favorites.book", "reviews", "rents"]
        })
        return user
    }

    async updatePartial(
        id: number,
        { complete_name, phone, address, username, email, password, details }: UpdatePatchUserInput
    ) {
        try {
            const oldUser = await this.show(id);

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

            if (details) {
                data.details = details;
            }

            await this.usersRepository.update(id, data);

            return this.show(id);

        } catch (err) {
            throw err
        }
    }

    // async updateImage(
    //     id,
    //     image
    // ) {
    //     try {

    //         const oldUser = await this.show(id);

    //         const data: any = {};

    //         const regex = /\/([^\/]+)\.[^\/]+$/;
    //         const match = oldUser.image.match(regex);
    //         const oldImageId = match[1];

    //         if (image) {
    //             if (oldImageId != process.env.CLOUDINARY_DEFAULT_USER_IMG_ID) {

    //                 await this.cloudinaryService.deleteFile(oldImageId)
    //                 const newImage = await this.cloudinaryService.uploadFile(image)
    //                 data.image = newImage.url
    //             }
    //             else {
    //                 const newImage = await this.cloudinaryService.uploadFile(image)
    //                 data.image = newImage.url
    //             }
    //         }

    //         await this.usersRepository.update(id, data);

    //         return this.show(id);

    //     } catch (err) {
    //         throw err
    //     }
    // }

    async delete(id: number) {
        await this.exist(id);

        await this.usersRepository.delete(id);

        return true;
    }

    async exist(id: number) {
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