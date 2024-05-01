import { ReviewService } from "../../../review/review.service";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ReviewType } from "../types/review.type";
import { CreateReviewArgs } from "../args/create-review.args";

@Resolver('reviews')
export class ReviewResolver {
    constructor(private readonly reviewService: ReviewService) { }

    @Mutation(() => ReviewType)
    async createReview(@Args() args: CreateReviewArgs): Promise<ReviewType> {
        return this.reviewService.create(args.data);
    }

    @Mutation(() => Boolean)
    async deleteReview(@Args('id') id: number) {
        return await this.reviewService.delete(id)
    }

}