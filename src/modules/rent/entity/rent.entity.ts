
import { Book } from "src/modules/book/entity/book.entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Rent {

    @PrimaryGeneratedColumn({
        // unsigned: true
    })
    id: number;


    @Column({
    })
    date: string;


    @ManyToOne(type => User, user => user.rents)
    user: User;


    @ManyToOne(type => Book, book => book.rents)
    book: Book;


    @CreateDateColumn()
    createdAt: string;


    @UpdateDateColumn()
    updatedAt: string;

}