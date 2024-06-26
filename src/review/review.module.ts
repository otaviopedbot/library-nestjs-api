import { Module } from "@nestjs/common";
import { ReviewController } from "./review.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./entity/review.entity";
import { ReviewService } from "./review.service";
import { BookModule } from "../book/book.module";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Review]),
        BookModule,
        UserModule
    ],
    controllers: [ReviewController],
    providers: [ReviewService],
    exports: [ReviewService]
})
export class ReviewModule { }