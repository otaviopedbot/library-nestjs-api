import { Column, CreateDateColumn, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Book } from "../../book/entity/book.entity"
import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
@Entity({
    name: 'reviews',
})
export class Review {

    @PrimaryGeneratedColumn({
    })
    @Field(() => ID)
    id: number;

    @Field()
    @Column({
    })
    rating: number;

    @Field()
    @Column({
        length: 127,
        nullable: true
    })
    body: string;

    @Field()
    @Column({
    })
    user_id: number;

    @Field()
    @Column({
    })
    book_id: number;

    @ManyToOne(() => User, user => user.reviews)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Book, book => book.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: Book

    @Field()
    @CreateDateColumn()
    createdAt: string;

    @Field()
    @UpdateDateColumn()
    updatedAt: string;

}