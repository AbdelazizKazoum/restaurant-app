/* eslint-disable prettier/prettier */
import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    user_name: string;

    @Column()
    @Exclude()
    pass: string;

    @Column()
    @Exclude()
    salt: string;

    // @Column()
    // activity: number;
}
