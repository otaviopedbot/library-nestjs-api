import { Controller, Post, Patch, Delete, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('/teste')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) { }

    @Post()
    @UseInterceptors(FileInterceptor('cover'))
    async create(@UploadedFile() cover) {
       return this.cloudinaryService.uploadFile(cover);
    }

    @Delete()
    async delete(@Body() fileId) {
        return this.cloudinaryService.deleteFile(fileId);
    }
}

