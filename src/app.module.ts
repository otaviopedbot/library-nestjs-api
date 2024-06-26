import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './user/entity/user.entity';
import { Author } from './author/entity/author.entity';
import { Book } from './book/entity/book.entity';
import { Rent } from './rent/entity/rent.entity';
import { Review } from './review/entity/review.entity';
import { Favorite } from './favorite/entity/favorite.entity';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { RentModule } from './rent/rent.module';
import { FavoriteModule } from './favorite/favorite.module';
import { ReviewModule } from './review/review.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot(),

    UserModule,
    AuthorModule,
    BookModule,
    RentModule,
    FavoriteModule,
    ReviewModule,
    CloudinaryModule,
    AuthModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Author, Book, Rent, Review, Favorite],
      synchronize: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }