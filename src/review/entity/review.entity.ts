import { Column, CreateDateColumn, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Book } from "src/book/entity/book.entity";


@Entity()
export class Review {

    @PrimaryGeneratedColumn({
        // unsigned: true
    })
    id: number;


    @Column({
    })
    rating: number;


    @Column({
        length: 127,
        nullable: true
    })
    body: string;


    @ManyToOne(type => User, user => user.review)
    user: User[];


    @ManyToOne(type => Book, book => book.review)
    book: Book[];


    @CreateDateColumn()
    createdAt: string;


    @UpdateDateColumn()
    updatedAt: string;

}