import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './modules/user/entity/user.entity';
import { Author } from './modules/author/entity/author.entity';
import { Book } from './modules/book/entity/book.entity';
import { Rent } from './modules/rent/entity/rent.entity';
import { Review } from './modules/review/entity/review.entity';
import { Favorite } from './modules/favorite/entity/favorite.entity';
import { AuthorModule } from './modules/author/author.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthorModule,
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