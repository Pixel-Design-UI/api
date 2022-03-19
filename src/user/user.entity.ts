import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

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

    @Column()
    fullName: string;

    @Column()
    gender: string;

    @Column()
    speakingLanguage: string;

    @Column()
    city: string;

    @Column()
    birthday: Date;

    @Column()
    about: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
