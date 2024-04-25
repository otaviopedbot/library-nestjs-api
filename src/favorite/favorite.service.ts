import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateFavoriteDTO } from "./dto/create-favorite.dto";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Favorite } from "./entity/favorite.entity";
import { UserService } from "src/user/user.service";
import { BookService } from "src/book/book.service";


@Injectable()
export class FavoriteService {

    constructor(
        @InjectRepository(Favorite)
        private favoritesRepository: Repository<Favorite>,
        private readonly userService: UserService,
        private readonly bookService: BookService,
    ) { }

    async create(data: CreateFavoriteDTO) {

        await this.userService.exists(data.user_id)

        await this.bookService.exist(data.book_id)

        if (
            await this.favoritesRepository.exists({
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
            throw new NotFoundException(`the author with id ${id} does not exist`);
        }
    }

}