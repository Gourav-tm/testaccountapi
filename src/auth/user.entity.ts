import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum USER_ROLE {
  ADMIN = "admin",
  HR = "hr",
  EMPLOYEE = "employee",
  SUPERADMIN = "superadmin",
  VIEWER = "viewer"
}
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
  
  @Column({
    type: "enum",
    enum: USER_ROLE,
    default: USER_ROLE.VIEWER
  })
  role: USER_ROLE;


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
