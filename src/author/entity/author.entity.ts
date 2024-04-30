import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Book } from "../../book/entity/book.entity"


@ObjectType()
@Entity({
    name: 'authors',
})
export class Author {

    @Field(() => ID)
    @PrimaryGeneratedColumn({
    })
    id: number;

    @Field()
    @Column({
        length: 127
    })
    name: string;

    @Field()
    @OneToMany(type => Book, book => book.author)
    books: Book[];

    @Field({ nullable: true })
    @CreateDateColumn()
    createdAt: string;

    @Field({ nullable: true })
    @UpdateDateColumn()
    updatedAt: string;

}