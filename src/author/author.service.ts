import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateAuthorDTO } from "./dto/create-author.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcryptjs'
import { Author } from "./entity/author.entity";
import { UpdatePatchAuthorDTO } from "./dto/update-patch-author.dto";


@Injectable()
export class AuthorService {

    constructor(
        @InjectRepository(Author)
        private authorsRepository: Repository<Author>
    ) { }

    async create(data: CreateAuthorDTO) {

        if (
            await this.authorsRepository.exist({
                where: {
                    name: data.name,
                },
            })
        ) {
            throw new BadRequestException('name already in use');
        }

        const author = this.authorsRepository.create(data)

        return this.authorsRepository.save(author)
    }

    async list() {
        return this.authorsRepository.find()
    }

    async show(id: number) {
        await this.exists(id);

        return this.authorsRepository.findOneBy({
            id
        })
    }

    async update(
        id: number,
        { name }: CreateAuthorDTO
    ) {

        await this.exists(id)

        await this.authorsRepository.update(id, {
            name
        });

        return this.show(id)
    }

    async updatePartial(
        id: number,
        { name }: UpdatePatchAuthorDTO
    ) {

        await this.exists(id);

        const data: any = {};

        if (name) {
            data.name = name;
        }

        await this.authorsRepository.update(id, data);

        return this.show(id);
    }

    async delete(id: number) {
        await this.exists(id);

        await this.authorsRepository.delete(id);

        return true;
    }

    async exists(id: number) {
        if (
            !(await this.authorsRepository.exists({
                where: {
                    id,
                },
            }))
        ) {
            throw new NotFoundException(`the author with id ${id} does not exist`);
        }
    }

}