import { User } from "src/user/user.entity";
import { PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => User, (userId: User) => userId.codes, { eager:true })
    userId: User;

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
