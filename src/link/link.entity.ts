import { User } from "src/user/user.entity";
import { PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

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

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}