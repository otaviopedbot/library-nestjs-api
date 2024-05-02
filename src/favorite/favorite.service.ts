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

        const find = await this.favoritesRepository.findOne({
            where: {
                book_id: data.book_id,
                user_id: data.user_id,
            },
        })

        if (find) {
            throw new BadRequestException('This book has already been favorited');
        }

        const favorite = this.favoritesRepository.create(data)

        return this.favoritesRepository.save(favorite)
    }

    async delete(user_id, book_id) {

        await this.userService.exist(user_id)

        await this.bookService.exist(book_id)

        const favorite = await this.favoritesRepository.findOne({
            where: {
                book_id: book_id,
                user_id: user_id,
            },
        })

        if (!favorite) {
            throw new BadRequestException('This favorite does not exists');
        }

        await this.favoritesRepository.delete(favorite.id);

        return true;
    }

}