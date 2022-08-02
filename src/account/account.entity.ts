import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    level: number;

    @Column()
    creationTime: Date;

    @Column()
    createdBy: string;

    @Column()
    updationTime: Date;

    @Column()
    updatedBy: string;

    @BeforeInsert()
    updateCreationTime() {
        this.creationTime = new Date();
        this.updationTime = new Date();
    }

    @BeforeUpdate()
    updateUpdationTime() {
        this.updationTime = new Date();
    }
}