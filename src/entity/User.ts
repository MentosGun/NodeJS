import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({type: "varchar", length: 255})
  username: string;
  
  @Column({type: "varchar", length: 255})
  password: string;
  
  @Column()
  firstName: string;
  
  @Column()
  lastName: string;
  
  @Column("date")
  birthdayDate: Date;
  
  @Column()
  email: string;
  
  @Column("datetime")
  createdAt: Date;
  
  @Column()
  lastPasswordResetDate: Date;
}
