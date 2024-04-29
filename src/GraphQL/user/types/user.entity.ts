import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Review } from "../../review/types/review.entity";
import { Favorite } from "../../favorite/types/favorite.entity";
import { Rent } from "../../rent/types/rent.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";
require('dotenv').config();


@ObjectType()
@Entity({
    name: 'users',
})
export class User {

    @PrimaryGeneratedColumn({
    })
    @Field(() => ID)
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
        nullable: true,
        default: process.env.CLOUDINARY_DEFAULT_USER_IMG
    })
    image: string;


    @Column({
        nullable: true
    })
    details: string;


    @Column({
        default: 0
    })
    is_admin: number;


    @OneToMany(type => Rent, rent => rent.user)
    rents: Rent[];


    @OneToMany(type => Review, review => review.user)
    reviews: Review[];


    @OneToMany(type => Favorite, favorite => favorite.user)
    favorites: Favorite[];


    @CreateDateColumn()
    createdAt: string;


    @UpdateDateColumn()
    updatedAt: string;

}