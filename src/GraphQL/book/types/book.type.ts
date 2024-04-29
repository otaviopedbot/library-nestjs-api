import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType('Book')
export class BookType {

    @Field(()=> ID)
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

}