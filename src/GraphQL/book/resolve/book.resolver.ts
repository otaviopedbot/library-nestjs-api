import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { BookService } from "../../../book/book.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BookType } from "../types/book.type";
import { CreateBookArgs } from "../args/create-book.args";
import { UpdateBookArgs } from "../args/apdate-book.args";
import { Book } from "../../../book/entity/book.entity";


@Resolver('books')
export class BookResolver {
    constructor(private readonly bookService: BookService) { }

    @Mutation(() => BookType)
    async createBook(@Args() args: CreateBookArgs): Promise<BookType> {
        return this.bookService.create(args.data);
    }

    @Query(() => [BookType])
    async listBooks() {
        return this.bookService.list();
    }

    @Query(() => BookType)
    async showBook(@Args('id') id: number): Promise<BookType> {
        return this.bookService.show(id);
    }

    @Mutation(() => BookType)
    async updatePartialBook(@Args() args: UpdateBookArgs, @Args('id') id: number): Promise<BookType> {
        return this.bookService.updatePartial(id, args.data);
    }

    // @Mutation(() => BookType)
    // @UseInterceptors(FileInterceptor('cover'))
    // async updateCoverBook(@Args('id', ParseIntPipe) id: number, @UploadedFile() cover: Express.Multer.File) {
    //     console.log(cover)
    //     return this.bookService.updateCover(id, cover);
    // }

    @Mutation(() => BookType)
    async deleteBook(@Args('id') id: number) {
        return await this.bookService.delete(id)
    }

}