import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: any;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    isAdministrator: boolean;

    @Column({ default: false })
    emailValidated: boolean;

    @Column({ default: false })
    isLoggedWithGoogle: boolean;

    @Column({ default: false })
    isLoggedWithDiscord: boolean;

    @Column({ nullable: true })
    fullName: string;

    @Column({ nullable: true })
    profileUrl: string;

    @Column({ nullable: true })
    about: string;

    //link to links

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
