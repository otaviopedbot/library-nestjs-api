import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateFavoriteInput } from "../GraphQL/favorite/inputs/create-favorite.input";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Favorite } from "./entity/favorite.entity";
import { UserService } from "../user/user.service";
import { BookService } from "../book/book.service";


@Injectable()
export class FavoriteService {

    constructor(
        @InjectRepository(Favorite)
        private favoritesRepository: Repository<Favorite>,
        private readonly userService: UserService,
        private readonly bookService: BookService,
    ) { }

    async create(data: CreateFavoriteInput) {

        await this.userService.exist(data.user_id)

        await this.bookService.exist(data.book_id)

        if (
            await this.favoritesRepository.exists({
                where: {
                    book_id: data.book_id,
                    user_id: data.user_id,
                },
            })
        ) {
            throw new BadRequestException('This book has already been favorited');
        }

        const favorite = this.favoritesRepository.create(data)

        return this.favoritesRepository.save(favorite)
    }

    async delete(id: number) {
        await this.exist(id);

        await this.favoritesRepository.delete(id);

        return true;
    }

    async exist(id: number) {
        if (
            !(await this.favoritesRepository.exists({
                where: {
                    id,
                },
            }))
        ) {
            throw new NotFoundException(`the favorite with id ${id} does not exist`);
        }
    }

}