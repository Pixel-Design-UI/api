import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Code {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => User, (userId: User) => userId.codes, {onDelete:'CASCADE'})
    userId: User;

    @Column()
    code: number;

    @Column()
    type: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}