import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete } from "@nestjs/common";
import { CreateReviewDTO } from "./dto/create-review.dto";
import { ReviewService } from "./review.service";
import { UpdatePatchReviewDTO } from "./dto/update-patch-review.dto";

@Controller('reviews')
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) { }

    @Post()
    async create(@Body() data: CreateReviewDTO) {
        return this.reviewService.create(data);
    }

    @Get()
    async listBookReviews(@Param('bookId', ParseIntPipe) bookId: number) {
        return this.reviewService.listBookReviews(bookId);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchReviewDTO, @Param('id', ParseIntPipe) id: number) {
        return this.reviewService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return {
            success: await this.reviewService.delete(id),
        };
    }

}