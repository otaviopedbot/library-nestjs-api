import { Column, CreateDateColumn, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";
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


    @Column({
    })
    user_id: number;


    @Column({
    })
    book_id: number;


    @ManyToOne(() => User, user => user.reviews)
    @JoinColumn({ name: 'user_id' })
    user: User[];


    @ManyToOne(() => Book, book => book.reviews)
    @JoinColumn({ name: 'author_id' })
    book: Book[]


    @CreateDateColumn()
    createdAt: string;


    @UpdateDateColumn()
    updatedAt: string;

}