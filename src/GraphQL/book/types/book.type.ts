import { Field, ID, ObjectType } from "@nestjs/graphql";
import { AuthorType } from "../../author/types/author.type";
import { RentType } from "../../rent/types/rent.types";
import { FavoriteType } from "../../favorite/types/favorite.type";
import { ReviewType } from "../../review/types/review.type";


@ObjectType()
export class BookType {

    @Field(() => ID)
    id: number;

    @Field()
    title: string;

    @Field()
    author_id: number;

    @Field()
    page: number;

    @Field()
    quantity: number;

    @Field({ nullable: true })
    synopsis: string;

    @Field({ nullable: true })
    cover: string;

    @Field({ nullable: true })
    createdAt: string;

    @Field({ nullable: true })
    updatedAt: string;

    @Field(type => AuthorType)
    author: AuthorType;

    @Field(type => [RentType])
    rents: RentType[];

    @Field(type => [FavoriteType])
    favorites: FavoriteType[];

    @Field(type => [ReviewType])
    reviews: ReviewType[];

}