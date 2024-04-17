import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateFavoriteDTO } from "./dto/create-favorite.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Favorite } from "./entity/favorite.entity";


@Injectable()
export class FavoriteService {

    constructor(
        @InjectRepository(Favorite)
        private favoritesRepository: Repository<Favorite>
    ) { }

    async create(data: CreateFavoriteDTO) {

        if (
            await this.favoritesRepository.exist({
                where: {
                    book_id: data.book_id,
                    user_id: data.user_id
                },
            })
        ) {
            throw new BadRequestException('This book has already been favorited');
        }

        const favorite = this.favoritesRepository.create(data)

        return this.favoritesRepository.save(favorite)
    }


    async delete(id: number) {
        await this.exists(id);

        await this.favoritesRepository.delete(id);

        return true;
    }

    async exists(id: number) {
        if (
            !(await this.favoritesRepository.exists({
                where: {
                    id,
                },
            }))
        ) {
            throw new NotFoundException(`the author with id ${id} does not exist`);
        }
    }

}