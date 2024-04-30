import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "../user.service";
import { UpdatePatchUserDTO } from "../inputs/update-patch-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserType } from "../types/user.type";

@Resolver('users')
export class UserResolver {
    constructor(private readonly userService: UserService) { }

    @Query(() => [UserType])
    async listUsers() {
        return this.userService.list();
    }

    @Query(() => UserType)
    async showUser(@Args('id') id: number): Promise<UserType> {
        return this.userService.show(id);
    }

    @Mutation(() => UserType)
    async updatePartial(@Args('data') data: UpdatePatchUserDTO, @Args('id') id: number): Promise<UserType> {
        return this.userService.updatePartial(id, data);
    }

    // @Mutation(() => User)
    // @UseInterceptors(FileInterceptor('image'))
    // async updateImageUser(@Args('id') id: number, @UploadedFile() image: Express.Multer.File) {
    //     return this.userService.updateImage(id, image);
    // }

    @Mutation(() => Boolean)
    async deleteUser(@Args('id') id: number) {
        await this.userService.delete(id)
    }

}