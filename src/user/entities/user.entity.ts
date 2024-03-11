import { IUser } from '../types/user.types';

export class User implements IUser {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
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
