import { Controller, Post, Delete, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BookService } from '../book/book.service';
import { UserService } from '../user/user.service';



@Controller('upload')
export class ImageUploadController {
    constructor(
        private readonly BookService: BookService,
        private readonly UserService: UserService

    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('cover'))
    async create(@Body() data, @UploadedFile() cover) {

        if (data.type == "book") {
            return this.BookService.updateCover(data.id, cover)
        }

        if (data.type == "user") {
            return this.UserService.updateImage(data.id, cover)
        }

    }
}