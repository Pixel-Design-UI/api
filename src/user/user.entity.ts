import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, IsNull } from 'typeorm';

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

    @Column({ nullable: true })
    fullName: string;

    @Column({ nullable: true })
    gender: string;

    @Column({ nullable: true })
    speakingLanguage: string;

    @Column({ nullable: true })
    city: string;

    @Column({ nullable: true })
    birthday: Date;

    @Column({ nullable: true })
    about: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
