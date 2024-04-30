import { Module } from "@nestjs/common";
import { AuthorResolver } from "../GraphQL/author/resolve/author.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Author } from "./entity/author.entity";
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