import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete } from "@nestjs/common";
import { CreateReviewDTO } from "../inputs/create-review.dto";
import { ReviewService } from "../review.service";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { ReviewType } from "../types/review.type";

@Resolver('reviews')
export class ReviewResolver {
    constructor(private readonly reviewService: ReviewService) { }

    @Mutation(() => ReviewType)
    async create(@Args('data') data: CreateReviewDTO): Promise<ReviewType> {
        return this.reviewService.create(data);
    }

    @Mutation(() => Boolean)
    async delete(@Args('id') id: number) {
        await this.reviewService.delete(id)
    }

}