import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { CreateBookDTO } from "../dto/create-book.dto";
import { BookService } from "../book.service";
import { UpdatePatchBookDTO } from "../dto/update-patch-book.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Book } from "../entity/book.entity";


@Resolver('books')
export class BookResolver {
    constructor(private readonly bookService: BookService) { }

    @Mutation(() => Book)
    async createBook(@Args() data: CreateBookDTO) {
        return this.bookService.create(data);
    }

    @Query(()=> [Book])
    async listBooks() {
        return this.bookService.list();
    }

    @Query(()=> Book)
    async showBook(@Args('id') id: number) {
        return this.bookService.show(id);
    }

    @Mutation(() => Book)
    async updatePartialBook(@Args() data: UpdatePatchBookDTO, @Args('id') id: number) {
        return this.bookService.updatePartial(id, data);
    }

    // @Mutation(() => Book)
    // @UseInterceptors(FileInterceptor('cover'))
    // async updateCoverBook(@Args('id', ParseIntPipe) id: number, @UploadedFile() cover: Express.Multer.File) {

    //     console.log(cover)

    //     return this.bookService.updateCover(id, cover);
    // }

    @Mutation(() => Boolean)
    async deleteBook(@Args('id') id: number) {
        return {
            success: await this.bookService.delete(id),
        };
    }

}