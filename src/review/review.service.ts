import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateReviewDTO } from "./dto/create-review.dto";
import { Repository } from "typeorm";
import { Review } from "./entity/review.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdatePatchReviewDTO } from "./dto/update-patch-review.dto";


@Injectable()
export class ReviewService {

    constructor(
        @InjectRepository(Review)
        private reviewsRepository: Repository<Review>,
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

            const review = this.reviewsRepository.create(data);

            return this.reviewsRepository.save(review);

        } catch (err) {
            throw err;
        }
    }

    async listBookReviews(bookId: number) {
        
        const reviews = await this.reviewsRepository.find({
            where: { book_id: bookId },
        })
        return reviews
    }

    async updatePartial(
        id: number,
        { rating, body, }: UpdatePatchReviewDTO
    ) {

        try {

            await this.exists(id);

            const data: any = {};

            if (rating) {
                data.rating = rating;
            }

            if (body) {
                data.body = body;
            }

            return await this.reviewsRepository.update(id, data);

        } catch (err) {
            throw err
        }
    }

    async delete(id: number) {
        await this.exists(id);

        await this.reviewsRepository.delete(id);

        return true;
    }

    async exists(id: number) {
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