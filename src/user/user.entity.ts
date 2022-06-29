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

    @Column()
    @Exclude({ toPlainOnly: true })
    email: string;

    @Column()
    @Exclude({ toPlainOnly: true })
    password?: string;

    @Column({ default: false })
    @Exclude({ toPlainOnly: true })
    isAdministrator: boolean;

    @Column({ default: false })
    @Exclude({ toPlainOnly: true })
    emailValidated: boolean;

    @Column({ default: false })
    @Exclude({ toPlainOnly: true })
    isLoggedWithGoogle: boolean;

    @Column({ default: false })
    @Exclude({ toPlainOnly: true })
    isLoggedWithDiscord: boolean;

    @Column({ nullable: true })
    fullName: string;

    @Column({ nullable: true })
    profileImg: string;

    @Column({ nullable: true })
    @Exclude({ toPlainOnly: true })
    about: string;

    @OneToMany(() => Link, (link: Link) => link.userId, { cascade: true, eager:true})
    @Exclude({ toPlainOnly: true })
    links: Link[];

    @OneToMany(() => Code, (code: Code) => code.userId, { cascade: true})
    @Exclude({ toPlainOnly: true })
    codes: Code[];

    @OneToMany(() => Post, (post: Post) => post.userId)
    @Exclude({ toPlainOnly: true })
    posts: Post[];

    @CreateDateColumn({ name: 'created_at' })
    @Exclude({ toPlainOnly: true })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @Exclude({ toPlainOnly: true })
    updatedAt: Date;
}
