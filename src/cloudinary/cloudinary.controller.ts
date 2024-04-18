import { Controller, Delete, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }

  @Delete(':imageId')
  async deleteImage(@Param('imageId') imageId: string) {
    const result = await this.cloudinaryService.deleteFile(imageId);
    return result;
  }

}
