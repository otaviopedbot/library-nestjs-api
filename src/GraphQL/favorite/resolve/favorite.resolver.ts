import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete } from "@nestjs/common";
import { CreateFavoriteDTO } from "../inputs/create-favorite.dto";
import { FavoriteService } from "../favorite.service";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Favorite } from "../types/favorite.entity";


@Resolver('favorites')
export class FavoriteResolver {
    constructor(private readonly favoriteService: FavoriteService) { }

    @Mutation(() => Favorite)
    async createFavorite(@Args('data') data: CreateFavoriteDTO) {
        return this.favoriteService.create(data);
    }

    @Mutation(() => Boolean)
    async deleteFavorite(@Args('id') id: number) {
        return {
            success: await this.favoriteService.delete(id),
        };
    }
}