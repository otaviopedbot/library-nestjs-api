import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Favorite } from "./entity/favorite.entity";
import { FavoriteService } from "./favorite.service";
import { FavoriteController } from "./favorite.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([Favorite])
    ],
    controllers: [FavoriteController],
    providers: [FavoriteService],
    exports: [FavoriteService]
})
export class FavoriteModule { }