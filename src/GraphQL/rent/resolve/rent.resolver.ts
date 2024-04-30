import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete } from "@nestjs/common";
import { CreateRentDTO } from "../inputs/create-rent.dto";
import { RentService } from "../rent.service";
import { UpdatePatchRentDTO } from "../inputs/update-patch-rent.dto";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Rent } from "../entity/rent.entity";
import { RentType } from "../types/rent.types";


@Resolver('rents')
export class RentResolver {
    constructor(private readonly rentService: RentService) { }

    @Mutation(() => RentType)
    async createRent(@Args('data') data: CreateRentDTO): Promise<RentType> {
        return this.rentService.create(data);
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
    async updatePartialRent(@Args('data') data: UpdatePatchRentDTO, @Args('id') id: number): Promise<RentType> {
        return this.rentService.updatePartial(id, data);
    }

    @Mutation(() => String)
    async finishRent(@Args('id', ParseIntPipe) id: number) {
        return await this.rentService.finish(id)
    }

}