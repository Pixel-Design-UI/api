import { Post } from "src/post/post.entity";
import { User } from "src/user/user.entity";
import { PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => User, (userId: User) => userId.comments, { eager:true })
    userId: User;

    @Column()
    postId: string;

    @Column()
    message: string;

    @Column()
    likes: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}