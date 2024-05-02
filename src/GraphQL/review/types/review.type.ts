import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserType } from "../../user/types/user.type";
import { BookType } from "../../book/types/book.type";


@ObjectType()
export class ReviewType {

    @Field(() => ID)
    id: number;

    @Field()
    rating: number;

    @Field()
    body: string;

    @Field()
    user_id: number;

    @Field()
    book_id: number;

    @Field(type => UserType)
    user: UserType;

    @Field(type => BookType)
    book: BookType;

    @Field({ nullable: true })
    createdAt: string;

    @Field({ nullable: true })
    updatedAt: string;

}