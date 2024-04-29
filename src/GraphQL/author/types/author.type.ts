import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Book } from "../../book/book.entity"


@ObjectType()
@Entity({
    name: 'authors',
})
export class Author {

    @PrimaryGeneratedColumn({
    })
    @Field(() => ID)
    id: number;


    @Field()
    @Column({
        length: 127
    })
    name: string;

    @OneToMany(type => Book, book => book.author)
    books: Book[];

    @Field({ nullable: true })
    @CreateDateColumn()
    createdAt: string;

    @Field({ nullable: true })
    @UpdateDateColumn()
    updatedAt: string;

}