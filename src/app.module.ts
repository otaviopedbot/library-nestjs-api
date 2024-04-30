import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


// modules

import { Author } from './author/entity/author.entity';
import { AuthorModule } from './author/author.module';

import { User } from './user/entity/user.entity';
import { UserModule } from './user/user.module';

import { Rent } from './rent/entity/rent.entity';
import { RentModule } from './rent/rent.module';

import { Review } from './review/entity/review.entity';
import { ReviewModule } from './review/review.module';

import { Book } from './book/entity/book.entity';
import { BookModule } from './book/book.module';

import { Favorite } from './favorite/entity/favorite.entity';
import { FavoriteModule } from './favorite/favorite.module';

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
      entities: [Author, Book, Favorite, Rent, Review, User],
      synchronize: true
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      //include: [AuthorModule, BookModule, FavoriteModule, RentModule, ReviewModule, UserModule],
      autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    }),

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }