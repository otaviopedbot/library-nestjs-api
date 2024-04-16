import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete } from "@nestjs/common";
import { CreateBookDTO } from "./dto/create-book.dto";
import { BookService } from "./book.service";
import { UpdatePatchBookDTO } from "./dto/update-patch-book.dto";

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

    @Put(':id')
    async update(@Body() data: CreateBookDTO, @Param('id', ParseIntPipe) id: number) {
        return this.bookService.update(id, data);
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