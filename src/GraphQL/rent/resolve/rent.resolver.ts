import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete } from "@nestjs/common";
import { RentService } from "../rent.service";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Rent } from "../entity/rent.entity";
import { RentType } from "../types/rent.types";
import { CreateRentArgs } from "../args/create-rent.args";
import { UpdateRentArgs } from "../args/apdate-rent.args";


@Resolver('rents')
export class RentResolver {
    constructor(private readonly rentService: RentService) { }

    @Mutation(() => RentType)
    async createRent(@Args() args: CreateRentArgs): Promise<RentType> {
        return this.rentService.create(args.data);
    }

    @Query(() => [RentType])
    async listRents() {
        return this.rentService.list();
    }

    @Query(() => RentType)
    async showRent(@Args('id') id: number): Promise<RentType> {
        return this.rentService.show(id);
    }

    @Mutation(() => RentType)
    async updatePartialRent(@Args() args: UpdateRentArgs, @Args('id') id: number): Promise<RentType> {
        return this.rentService.updatePartial(id, args.data);
    }

    @Mutation(() => String)
    async finishRent(@Args('id', ParseIntPipe) id: number) {
        return await this.rentService.finish(id)
    }

}