import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete } from "@nestjs/common";
import { FavoriteService } from "../../../favorite/favorite.service";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { FavoriteType } from "../types/favorite.type";
import { CreateFavoriteArgs } from "../args/create-favorite.args";


@Resolver('favorites')
export class FavoriteResolver {
    constructor(private readonly favoriteService: FavoriteService) { }

    @Mutation(() => FavoriteType)
    async createFavorite(@Args() args: CreateFavoriteArgs): Promise<FavoriteType> {
        return this.favoriteService.create(args.data);
    }

    @Mutation(() => Boolean)
    async deleteFavorite(@Args('user_id') user_id: number, @Args('book_id') book_id: number) {
        return await this.favoriteService.delete(user_id, book_id)
    }
}