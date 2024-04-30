import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Review } from "../../review/entity/review.entity";
import { Favorite } from "../../favorite/entity/favorite.entity";
import { Rent } from "../../rent/entity/rent.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { FavoriteType } from "../../favorite/types/favorite.type";
import { ReviewType } from "../../review/types/review.type";
import { RentType } from "../../rent/types/rent.types";
import { User } from "../../../user/entity/user.entity";
require('dotenv').config();

@ObjectType()
export class RegisterUserType {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}


@ObjectType()
export class UserType {


  @Field(() => ID)
  id: number;

  @Field()
  complete_name: string;

  @Field()
  phone: string;

  @Field()
  address: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  details: string;

  @Field({ nullable: true })
  is_admin: number;

  @Field(type => RentType)
  rents: RentType[];

  @Field(type => ReviewType)
  reviews: ReviewType[];

  @Field(type => FavoriteType)
  favorites: FavoriteType[];

  @Field({ nullable: true })
  createdAt: string;

  @Field({ nullable: true })
  updatedAt: string;

}