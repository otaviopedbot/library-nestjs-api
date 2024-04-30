import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Favorite } from "../../GraphQL/favorite/entity/favorite.entity";
import { Rent } from "../../GraphQL/rent/entity/rent.entity";
import { Review } from "../../GraphQL/review/entity/review.entity";
import { Author } from "../../author/entity/author.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
@Entity({
    name: 'books',
})
export class Book {

    @Field(() => ID)
    @PrimaryGeneratedColumn({
    })
    id: number;

    @Field()
    @Column({
        length: 127
    })
    title: string;

    @Field()
    @Column({
    })
    author_id: number;

    @Field()
    @Column({
    })
    page: number;

    @Field()
    @Column({
    })
    quantity: number;

    @Field()
    @Column({
        nullable: true
    })
    synopsis: string;

    @Field()
    @Column({
        nullable: true,
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

    @Field()
    @CreateDateColumn()
    createdAt: string;

    @Field()
    @UpdateDateColumn()
    updatedAt: string;

}