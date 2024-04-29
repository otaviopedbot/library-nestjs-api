import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Favorite } from "./types/favorite.entity";
import { FavoriteService } from "./favorite.service";
import { UserModule } from "../user/user.module";
import { BookModule } from "../book/book.module";
import { FavoriteResolver } from "./resolve/favorite.resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([Favorite]),
        UserModule,
        BookModule
    ],
    providers: [FavoriteService, FavoriteResolver],
    exports: [FavoriteService]
})
export class FavoriteModule { }