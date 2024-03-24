import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../types/user.types';

@Entity('User')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column('int')
  version: number;

  @Column('int')
  createdAt: number;

  @Column('int')
  updatedAt: number;

  @Column()
  password: string;

  constructor({ login, password, id }: Partial<IUser>) {
    this.id = id;
    this.login = login;
    this.version = 1;
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    this.password = password;
  }
}
