import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "./entity/book.entity"
import { BookService } from "./book.service";
import { AuthorModule } from "../author/author.module";
import { CloudinaryModule } from "../cloudinary/cloudinary.module";
import { BookResolver } from "./resolve/book.resolver";


@Module({
    imports: [
        TypeOrmModule.forFeature([Book]),
        AuthorModule,
        CloudinaryModule,
    ],
    providers: [BookService, BookResolver],
    exports: [BookService]
})
export class BookModule { }