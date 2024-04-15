import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete } from "@nestjs/common";
import { CreateAuthorDTO } from "./dto/create-author.dto";
import { UpdatePutAuthorDTO } from "./dto/update-put-author.dto";
import { UpdatePatchAuthorDTO } from "./dto/update-patch-author.dto";
import { AuthorService } from "./author.service";

@Controller('authors')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) { }

    @Post()
    async create(@Body() data: CreateAuthorDTO) {

        return this.authorService.create(data);
    }

    @Get()
    async list() {
        return this.authorService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.authorService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutAuthorDTO, @Param('id', ParseIntPipe) id: number) {
        return this.authorService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchAuthorDTO, @Param('id', ParseIntPipe) id: number) {
        return this.authorService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return {
            success: await this.authorService.delete(id),
        };
    }

}