import { User } from 'src/user/user.entity';
import { Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';

export class Link {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(() => User, (userId: User) => userId.codes, {onDelete:'CASCADE'})
    userId: User;

    @Column()
    type: string;

    @Column()
    url: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}
