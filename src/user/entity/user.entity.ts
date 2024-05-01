import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Review } from "../../review/entity/review.entity";
import { Favorite } from "../../favorite/entity/favorite.entity";
import { Rent } from "../../rent/entity/rent.entity";
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


    @Field()
    @Column({
        length: 127
    })
    complete_name: string;

    @Field()
    @Column({
        length: 127,
        nullable: true
    })
    phone: string;

    @Field()
    @Column({
        nullable: true
    })
    address: string;

    @Field()
    @Column({
        length: 63,
        unique: true
    })
    username: string;

    @Field()
    @Column({
        length: 127,
        unique: true
    })
    email: string;

    @Field()
    @Column({
        length: 127
    })
    password: string;

    @Field()
    @Column({
        nullable: true,
        default: process.env.CLOUDINARY_DEFAULT_USER_IMG
    })
    image: string;

    @Field({ nullable: true })
    @Column({
        nullable: true
    })
    details: string;

    @Field()
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

    @Field()
    @CreateDateColumn()
    createdAt: string;

    @Field()
    @UpdateDateColumn()
    updatedAt: string;

}