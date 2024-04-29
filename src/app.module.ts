import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';


// modules

import { Author } from './GraphQL/author/types/author.type';
import { AuthorModule } from '././GraphQL/author/author.module';

import { User } from './GraphQL/user/types/user.entity';
import { UserModule } from './GraphQL/user/user.module';

import { Rent } from './GraphQL/rent/types/rent.entity';
import { RentModule } from '././GraphQL/rent/rent.module';

import { Review } from './GraphQL/review/types/review.entity';
import { ReviewModule } from '././GraphQL/review/review.module';

import { Book } from './GraphQL/book/book.entity';
import { BookModule } from './GraphQL/book/book.module';

import { Favorite } from './GraphQL/favorite/types/favorite.entity';
import { FavoriteModule } from './GraphQL/favorite/favorite.module';

import { CloudinaryModule } from '././GraphQL/cloudinary/cloudinary.module';


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
    // AuthModule,

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