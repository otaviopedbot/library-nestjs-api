import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete } from "@nestjs/common";
import { CreateReviewDTO } from "../dto/create-review.dto";
import { ReviewService } from "../review.service";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Review } from "../entity/review.entity";

@Resolver('reviews')
export class ReviewResolver {
    constructor(private readonly reviewService: ReviewService) { }

    @Mutation(() => Review)
    async create(@Args() data: CreateReviewDTO) {
        return this.reviewService.create(data);
    }

    @Mutation(() => Boolean)
    async delete(@Args('id') id: number) {
        return {
            success: await this.reviewService.delete(id),
        };
    }

}