import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  accountId: string;

  
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
