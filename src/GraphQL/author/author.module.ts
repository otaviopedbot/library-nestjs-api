import { Module } from "@nestjs/common";
import { AuthorResolver } from "./resolve/author.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Author } from "./types/author.type";
import { AuthorService } from "./author.service";
import { BookModule } from "../book/book.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Author])
    ],
    providers: [AuthorResolver, AuthorService],
    exports: [AuthorService]
})
export class AuthorModule { }