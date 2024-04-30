import { ReviewService } from "../../../review/review.service";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ReviewType } from "../types/review.type";
import { CreateReviewArgs } from "../args/create-review.args";

@Resolver('reviews')
export class ReviewResolver {
    constructor(private readonly reviewService: ReviewService) { }

    @Mutation(() => ReviewType)
    async create(@Args() args: CreateReviewArgs): Promise<ReviewType> {
        return this.reviewService.create(args.data);
    }

    @Mutation(() => Boolean)
    async delete(@Args('id') id: number) {
        await this.reviewService.delete(id)
    }

}