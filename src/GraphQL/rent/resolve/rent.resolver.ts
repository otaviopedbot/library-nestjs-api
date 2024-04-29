import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete } from "@nestjs/common";
import { CreateRentDTO } from "../inputs/create-rent.dto";
import { RentService } from "../rent.service";
import { UpdatePatchRentDTO } from "../inputs/update-patch-rent.dto";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Rent } from "../types/rent.entity";


@Resolver('rents')
export class RentResolver {
    constructor(private readonly rentService: RentService) { }

    @Mutation(() => Rent)
    async createRent(@Args('data') data: CreateRentDTO) {
        return this.rentService.create(data);
    }

    @Query(() => [Rent])
    async listRents() {
        return this.rentService.list();
    }

    @Query(() => Rent)
    async showRent(@Args('id') id: number) {
        return this.rentService.show(id);
    }

    @Mutation(() => Rent)
    async updatePartialRent(@Args('data') data: UpdatePatchRentDTO, @Args('id') id: number) {
        return this.rentService.updatePartial(id, data);
    }

    @Mutation(() => String)
    async finishRent(@Args('id', ParseIntPipe) id: number) {
        return await this.rentService.finish(id)
    }

}