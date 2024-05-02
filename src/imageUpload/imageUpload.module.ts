import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { BookModule } from '../book/book.module';
import { ImageUploadController } from './imageUpload.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
@Module({
  imports: [CloudinaryModule, UserModule, BookModule],
  controllers: [ImageUploadController],
  providers: [],
  exports: []
})
export class ImageUploadModule {}