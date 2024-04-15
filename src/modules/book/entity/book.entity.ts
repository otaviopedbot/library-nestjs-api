import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Author } from "src/modules/author/entity/author.entity";
import { Rent } from "src/modules/rent/entity/rent.entity";
import { Favorite } from "src/modules/favorite/entity/favorite.entity";
import { Review } from "src/modules/review/entity/review.entity";


@Entity()
export class Book {

    @PrimaryGeneratedColumn({
        // unsigned: true
    })
    id: number;


    @Column({
        length: 127
    })
    title: string;


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
        nullable: true
    })
    cover: string;


    @ManyToOne(type => Author, author => author.books)
    author: Author;


    @OneToMany(type => Rent, rent => rent.book)
    rents: Rent[];


    @OneToMany(type => Favorite, favorite => favorite.book)
    favorite: Favorite[];


    @OneToMany(type => Review, review => review.book)
    review: Review[];


    @CreateDateColumn()
    createdAt: string;


    @UpdateDateColumn()
    updatedAt: string;

}
