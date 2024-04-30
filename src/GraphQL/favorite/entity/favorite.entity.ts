import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Book } from "../../book/entity/book.entity"
import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
@Entity({
    name: 'favorites',
})
export class Favorite {

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

    @ManyToOne(() => User, user => user.favorites)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Book, book => book.favorites, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: Book

    @Field()
    @CreateDateColumn()
    createdAt: string;

    @Field()
    @UpdateDateColumn()
    updatedAt: string;

}