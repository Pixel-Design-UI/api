import { Code } from 'src/code/code.entity';
import { Link } from 'src/link/link.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

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
    profileImg: string;

    @Column({ nullable: true })
    about: string;

    @OneToMany(() => Link, (link: Link) => link.userId, { cascade: true, eager:true})
    links: Link[];

    @OneToMany(() => Code, (code: Code) => code.userId, { cascade: true})
    codes: Code[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
