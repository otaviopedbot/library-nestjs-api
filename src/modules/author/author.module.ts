import { Module } from "@nestjs/common";
import { AuthorController } from "./author.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Author } from "./entity/author.entity";
import { AuthorService } from "./author.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Author])
    ],
    controllers: [AuthorController],
    providers: [AuthorService],
    exports: []
})
export class AuthorModule { }