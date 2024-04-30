import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewDTO } from "./inputs/create-review.dto";
import { Repository } from "typeorm";
import { Review } from "./entity/review.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { BookService } from "../book/book.service";
import { UserService } from "../user/user.service";


@Injectable()
export class ReviewService {

    constructor(
        @InjectRepository(Review)
        private reviewsRepository: Repository<Review>,
        private readonly booksService: BookService,
        private readonly usersService: UserService
    ) { }

    async create(data: CreateReviewDTO) {
        try {
            const existingBook = await this.reviewsRepository.findOne({
                where: {
                    book_id: data.book_id,
                    user_id: data.user_id
                },
            });
            if (existingBook) {
                throw new BadRequestException('This book has already been reviwed');
            }

            await this.booksService.exist(data.book_id)
            await this.usersService.exist(data.user_id)

            const review = this.reviewsRepository.create(data);

            return this.reviewsRepository.save(review);

        } catch (err) {
            throw err;
        }
    }

    async delete(id: number) {
        await this.exist(id);

        await this.reviewsRepository.delete(id);

        return true;
    }

    async exist(id: number) {
        if (
            !(await this.reviewsRepository.exists({
                where: {
                    id,
                },
            }))
        ) {
            throw new NotFoundException(`the review with id ${id} does not exist`);
        }
    }

}