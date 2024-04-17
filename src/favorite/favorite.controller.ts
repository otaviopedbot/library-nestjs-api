import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete } from "@nestjs/common";
import { CreateFavoriteDTO } from "./dto/create-favorite.dto";
import { FavoriteService } from "./favorite.service";


@Controller('favorites')
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) { }

    @Post()
    async create(@Body() data: CreateFavoriteDTO) {

        return this.favoriteService.create(data);
    }

    @Get(':userId')
    async listUserFavorites(@Param('userId', ParseIntPipe) userId: number) {
        return this.favoriteService.listUserFavorites(userId);
    }


    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return {
            success: await this.favoriteService.delete(id),
        };
    }

}