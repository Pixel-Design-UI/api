import { Exclude } from 'class-transformer';
import { Code } from 'src/code/code.entity';
import { Link } from 'src/link/link.entity';
import { Post } from 'src/post/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: any;

    @Column()
    username: string;

    @Column({select: false})
    email: string;

    @Column({ select: false, nullable: true })
    password: string;

    @Column({ select: false, default: false })
    isAdministrator: boolean;

    @Column({ select: false, default: false })
    emailValidated: boolean;

    @Column({ select: false, default: false })
    isLoggedWithGoogle: boolean;

    @Column({ select: false, default: false })
    isLoggedWithDiscord: boolean;

    @Column({ nullable: true })
    fullName: string;

    @Column({ nullable: true })
    profileImg: string;

    @Column({ select: false, nullable: true })
    about: string;

    @OneToMany(() => Link, (link: Link) => link.userId, { cascade: true })
    links: Link[];

    @OneToMany(() => Code, (code: Code) => code.userId, { cascade: true})
    codes: Code[];

    @OneToMany(() => Post, (post: Post) => post.userId)
    posts: Post[];

    @CreateDateColumn({ name: 'created_at', select: false })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', select: false })
    updatedAt: Date;
}
