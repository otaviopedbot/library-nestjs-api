import { Column, CreateDateColumn, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Book } from "../../book/entity/book.entity";



@Entity({
    name: 'reviews',
})
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


    @Column({
    })
    user_id: number;


    @Column({
    })
    book_id: number;


    @ManyToOne(() => User, user => user.reviews)
    @JoinColumn({ name: 'user_id' })
    user: User[];


    @ManyToOne(() => Book, book => book.reviews, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: Book[]


    @CreateDateColumn()
    createdAt: string;


    @UpdateDateColumn()
    updatedAt: string;

}