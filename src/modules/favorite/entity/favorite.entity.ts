import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";
import { Book } from "src/modules/book/entity/book.entity";


@Entity()
export class Favorite {

    @PrimaryGeneratedColumn({
        // unsigned: true
    })
    id: number;


    @ManyToOne(type => User, user => user.favorite)
    user: User[];


    @ManyToOne(type => Book, book => book.favorite)
    book: Book[];


    @CreateDateColumn()
    createdAt: string;


    @UpdateDateColumn()
    updatedAt: string;

}