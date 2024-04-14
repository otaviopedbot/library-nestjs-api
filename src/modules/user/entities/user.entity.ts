import { Rent } from "src/modules/rent/entity/rent.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
        enum: [0,1]
    })
    is_admin: number;


    @OneToMany(type => Rent, rent => rent.user)
    rents: Rent[];


    @CreateDateColumn()
    createdAt: string;

    
    @UpdateDateColumn()
    updatedAt: string;

}