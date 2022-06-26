import { User } from "src/user/user.entity";
import { PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class Link {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => User, (userId: User) => userId.links, {onDelete:'CASCADE'})
    userId: User;

    @Column()
    type: string;

    @Column()
    url: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}