import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "../user.service";
import { UpdatePatchUserDTO } from "../inputs/update-patch-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "../types/user.entity";

@Resolver('users')
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query(() => [User])
    async listUsers() {
        return this.userService.list();
    }

    @Query(() => User)
    async showUser(@Args('id') id: number) {
        return this.userService.show(id);
    }

    @Mutation(() => User)
    async updatePartial(@Args('data') data: UpdatePatchUserDTO, @Args('id') id: number) {
        return this.userService.updatePartial(id, data);
    }

    // @Mutation(() => User)
    // @UseInterceptors(FileInterceptor('image'))
    // async updateImageUser(@Args('id') id: number, @UploadedFile() image: Express.Multer.File) {
    //     return this.userService.updateImage(id, image);
    // }

    @Mutation(() => Boolean)
    async deleteUser(@Args('id') id: number) {
        return {
            success: await this.userService.delete(id),
        };
    }

}