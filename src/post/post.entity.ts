import { Comment } from "src/comment/comment.entity";
import { User } from "src/user/user.entity";
import { PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, Entity, UpdateDateColumn, OneToMany } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => User, (userId: User) => userId.posts, { eager:true })
    userId: User;

    @OneToMany(() => Comment, (comment: Comment) => comment.postId)
    comments: Comment[];

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    url: string;

    //@Column()
    //imagesUrls: Array<string>;

    @Column()
    likes: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
