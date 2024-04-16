import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Review } from "../../review/entity/review.entity";
import { Rent } from "src/rent/entity/rent.entity";
import { Favorite } from "../../favorite/entity/favorite.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn({
        // unsigned: true
    })
    id: number;


    @Column({
        length: 127
    })
    complete_name: string;


    @Column({
        length: 127,
        nullable: true
    })
    phone: string;


    @Column({
        nullable: true
    })
    address: string;


    @Column({
        length: 63,
        unique: true
    })
    username: string;


    @Column({
        length: 127,
        unique: true
    })
    email: string;


    @Column({
        length: 127
    })
    password: string;


    @Column({
        nullable: true
    })
    image: string;


    @Column({
        nullable: true
    })
    details: string;


    @Column({
        default: false
    })
    is_admin: boolean;


    @OneToMany(type => Rent, rent => rent.user)
    rents: Rent[];


    @OneToMany(type => Review, review => review.user)
    review: Review[];


    @OneToMany(type => Favorite, favorite => favorite.user)
    favorite: Favorite[];


    @CreateDateColumn()
    createdAt: string;


    @UpdateDateColumn()
    updatedAt: string;

}