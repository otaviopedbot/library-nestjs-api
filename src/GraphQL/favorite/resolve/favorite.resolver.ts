import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete } from "@nestjs/common";
import { CreateFavoriteDTO } from "../inputs/create-favorite.dto";
import { FavoriteService } from "../favorite.service";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Favorite } from "../entity/favorite.entity";
import { FavoriteType } from "../types/favorite.type";


@Resolver('favorites')
export class FavoriteResolver {
    constructor(private readonly favoriteService: FavoriteService) { }

    @Mutation(() => FavoriteType)
    async createFavorite(@Args('data') data: CreateFavoriteDTO): Promise<FavoriteType> {
        return this.favoriteService.create(data);
    }

    @Mutation(() => Boolean)
    async deleteFavorite(@Args('id') id: number) {
        await this.favoriteService.delete(id)
    }
}