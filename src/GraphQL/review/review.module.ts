import { Module } from "@nestjs/common";
import { ReviewResolver } from "./resolve/review.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./types/review.entity";
import { ReviewService } from "./review.service";
import { BookModule } from "../book/book.module";
import { UserModule } from "../user/user.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Review]),
        BookModule,
        UserModule
    ],
    providers: [ReviewService, ReviewResolver],
    exports: [ReviewService]
})
export class ReviewModule { }