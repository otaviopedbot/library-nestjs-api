import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { User } from "../../user/types/user.entity";
import { Book } from "../../book/types/book.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
@Entity({
    name: 'rents',
})
export class Rent {

    @PrimaryGeneratedColumn({
    })
    @Field(() => ID)
    id: number;


    @Column({
    })
    user_id: number;


    @Column({
    })
    book_id: number;


    @Column({
        default: ''
    })
    finished_in: string;


    @ManyToOne(() => User, user => user.rents)
    @JoinColumn({ name: 'user_id' })
    user: User


    @ManyToOne(() => Book, book => book.rents, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: Book


    @CreateDateColumn()
    createdAt: string;


    @UpdateDateColumn()
    updatedAt: string;

}