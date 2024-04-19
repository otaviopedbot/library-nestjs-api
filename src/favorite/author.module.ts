import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Favorite } from "./entity/favorite.entity";
import { FavoriteService } from "./favorite.service";
import { FavoriteController } from "./favorite.controller";
import { UserModule } from "src/user/user.module";
import { BookModule } from "src/book/book.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Favorite]),
        UserModule,
        BookModule
    ],
    controllers: [FavoriteController],
    providers: [FavoriteService],
    exports: [FavoriteService]
})
export class FavoriteModule { }