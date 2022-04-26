import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Code {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    userId: string;

    @Column()
    code: number;

    @Column()
    type: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}