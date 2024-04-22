import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";

import { UserService } from "./user.service";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async list() {
        return this.userService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.userService.show(id);
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('image'))
    async updatePartial(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number, @UploadedFile() image) {
        return this.userService.updatePartial(id, data, image);
    }

    @Patch('image/:id')
    @UseInterceptors(FileInterceptor('image'))
    async updateImager(@Param('id', ParseIntPipe) id: number, @UploadedFile() image: Express.Multer.File) {

        return this.userService.updateImage(id, image);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return {
            success: await this.userService.delete(id),
        };
    }

}