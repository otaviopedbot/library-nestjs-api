import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Favorite } from "../../favorite/entity/favorite.entity";
import { Rent } from "../../rent/entity/rent.entity";
import { Review } from "../../review/entity/review.entity";
import { Author } from "../../author/entity/author.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";
require('dotenv').config();


@ObjectType()
@Entity({
    name: 'books',
})
export class Book {

    @PrimaryGeneratedColumn({
    })
    @Field(() => ID)
    id: number;


    @Column({
        length: 127
    })
    title: string;

    @Column({
    })
    author_id: number;


    @Column({
    })
    page: number;


    @Column({
    })
    quantity: number;


    @Column({
        nullable: true
    })
    synopsis: string;


    @Column({
        default: process.env.CLOUDINARY_DEFAULT_BOOK_IMG
    })
    cover: string;


    @ManyToOne(() => Author, author => author.books, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id' })
    author: Author


    @OneToMany(type => Rent, rent => rent.book)
    rents: Rent[];


    @OneToMany(type => Favorite, favorite => favorite.book)
    favorites: Favorite[];


    @OneToMany(type => Review, review => review.book)
    reviews: Review[];


    @CreateDateColumn()
    createdAt: string;


    @UpdateDateColumn()
    updatedAt: string;

}