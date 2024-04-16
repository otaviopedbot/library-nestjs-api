import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./entity/book.entity";
import { BookService } from "./book.service";
import { AuthorModule } from "../author/author.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Book]),
        AuthorModule
    ],
    controllers: [BookController],
    providers: [BookService],
    exports: [BookModule]
})
export class BookModule { }