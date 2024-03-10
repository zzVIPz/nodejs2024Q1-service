import { Injectable } from '@nestjs/common';
import { mockedUser } from 'src/mock-data/mock-data';
import { IUser } from 'src/user/types/user.types';

@Injectable()
export class DataService {
  users: Map<string, IUser>;

  constructor() {
    this.users = new Map<string, IUser>();
    this.users.set(mockedUser.id, mockedUser);
  }

  getAllUsers = () => Object.fromEntries(this.users.entries());

  getUserById = (id: string) => this.users.get(id);

  createUser = (id: string, user: IUser) => {
    this.users.set(id, user);
  };

  deleteUser = (id: string) => this.users.delete(id);
}
