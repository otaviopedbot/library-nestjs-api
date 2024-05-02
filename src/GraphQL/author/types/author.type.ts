import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BookType } from "../../book/types/book.type";


@ObjectType()
export class AuthorType {

    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field(type => [BookType])
    books: BookType[];

    @Field({ nullable: true })
    createdAt: string;

    @Field({ nullable: true })
    updatedAt: string;

}