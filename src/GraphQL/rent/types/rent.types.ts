import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BookType } from "../../book/types/book.type";
import { UserType } from "../../user/types/user.type";


@ObjectType()
export class RentType {

    @Field(() => ID)
    id: number;

    @Field()
    user_id: number;

    @Field()
    book_id: number;

    @Field()
    finished_in: string;

    @Field(type => UserType)
    user: UserType

    @Field(type => BookType)
    book: BookType

    @Field({ nullable: true })
    createdAt: string;

    @Field({ nullable: true })
    updatedAt: string;

}