import {Column, Entity, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Length} from 'class-validator';
import {Message} from './Message';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar", length: 255})
  @Length(2, 255)
  username: string;

  @Column({type: "varchar", length: 255})
  @Length(8, 255)
  password: string;

  /* @Column()
  firstName: string;

  @Column()
  lastName: string; */

  @Column("date")
  birthdayDate: Date;

  /* @Column()
  email: string; */

  @Column("datetime")
  createdAt: Date;

  /* @Column()
  lastPasswordResetDate: Date; */

  @OneToMany(type => Message, message => message.user)
  messages: Message[];
}
