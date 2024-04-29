import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateAuthorInput } from "./inputs/create-author.input";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcryptjs'
import { Author } from "./types/author.type";
import { UpdatePatchAuthorInput } from "./inputs/update-patch-author.input";


@Injectable()
export class AuthorService {

    constructor(
        @InjectRepository(Author)
        private authorsRepository: Repository<Author>
    ) { }

    async create(data: CreateAuthorInput) {
        if (await this.authorsRepository.exists({ where: { name: data.name } })) {
            throw new BadRequestException('name already in use');
        }

        const author = this.authorsRepository.create(data);
        return this.authorsRepository.save(author);
    }

    async list() {
        return this.authorsRepository.find()
    }

    async show(id: number) {
        await this.exist(id);

        return this.authorsRepository.findOne({
            where: { id: id },
            // relations: ["books"]
        })
    }

    async updatePartial(
        id: number,
        { name }: UpdatePatchAuthorInput
    ) {
        try {
            await this.exist(id);

            const data: any = {};

            if (name) {
                data.name = name;
            }

            await this.authorsRepository.update(id, data);

            return this.show(id);

        } catch (err) {
            throw err
        }
    }

    async delete(id: number) {
        await this.exist(id);

        await this.authorsRepository.delete(id);

        return true;
    }

    async exist(id: number) {
        if (
            !(await this.authorsRepository.exists({
                where: {
                    id
                },
            }))
        ) {
            throw new NotFoundException(`the author with id ${id} does not exist`);
        }
    }

}