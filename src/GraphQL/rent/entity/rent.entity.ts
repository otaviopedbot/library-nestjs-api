import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Book } from "../../book/entity/book.entity"
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

    @Field()
    @Column({
    })
    user_id: number;

    @Field()
    @Column({
    })
    book_id: number;

    @Field()
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

    @Field()
    @CreateDateColumn()
    createdAt: string;

    @Field()
    @UpdateDateColumn()
    updatedAt: string;

}