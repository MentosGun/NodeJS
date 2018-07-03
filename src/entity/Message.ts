import {Column, Entity, PrimaryGeneratedColumn, ManyToOne} from 'typeorm';
import {Length} from "class-validator";
import {User} from './User';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  content: string;

  @Column("datetime")
  createdAt: Date;

  @ManyToOne(type => User, user => user.messages)
  user: User;
}

// (type) => {return User;}
