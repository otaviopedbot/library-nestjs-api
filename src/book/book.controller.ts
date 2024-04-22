import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { CreateBookDTO } from "./dto/create-book.dto";
import { BookService } from "./book.service";
import { UpdatePatchBookDTO } from "./dto/update-patch-book.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Multer } from 'multer'; // Importe Multer diretamente

@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Post()
    async create(@Body() data: CreateBookDTO) {
        return this.bookService.create(data);
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

    @Patch('cover/:id')
    @UseInterceptors(FileInterceptor('cover'))
    async updateCover(@Param('id', ParseIntPipe) id: number, @UploadedFile() cover: Express.Multer.File) {

        console.log(cover)

        return this.bookService.updateCover(id, cover);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return {
            success: await this.bookService.delete(id),
        };
    }

}