import { PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    plateform: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    url: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
