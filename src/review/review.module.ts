import { Module } from "@nestjs/common";
import { ReviewController } from "./review.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./entity/review.entity";
import { ReviewService } from "./review.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Review])
    ],
    controllers: [ReviewController],
    providers: [ReviewService],
    exports: [ReviewService]
})
export class ReviewModule { }