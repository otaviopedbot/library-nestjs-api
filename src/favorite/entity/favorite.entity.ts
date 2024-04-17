import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Book } from "src/book/entity/book.entity";


@Entity()
export class Favorite {

    @PrimaryGeneratedColumn({
        // unsigned: true
    })
    id: number;


    @Column({
    })
    user_id: number;


    @Column({
    })
    book_id: number;


    @ManyToOne(() => User, user => user.favorites)
    @JoinColumn({ name: 'user_id' })
    user: User;


    @ManyToOne(() => Book, book => book.favorites)
    @JoinColumn({ name: 'book_id' })
    book: Book


    @CreateDateColumn()
    createdAt: string;


    @UpdateDateColumn()
    updatedAt: string;

}