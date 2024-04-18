import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { CreateBookDTO } from "./dto/create-book.dto";
import { BookService } from "./book.service";
import { UpdatePatchBookDTO } from "./dto/update-patch-book.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Post()
    @UseInterceptors(FileInterceptor('cover'))
    async create(@Body() data: CreateBookDTO, @UploadedFile() cover) {
        return this.bookService.create(data, cover);
    }

    @Get()
    async list() {
        return this.bookService.list();
    }

    @Get(':id')
    async show(@Param('id', ParseIntPipe) id: number) {
        return this.bookService.show(id);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchBookDTO, @Param('id', ParseIntPipe) id: number) {
        return this.bookService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return {
            success: await this.bookService.delete(id),
        };
    }

}