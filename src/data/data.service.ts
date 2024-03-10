import { Injectable } from '@nestjs/common';
import { mockedTrack, mockedUser } from 'src/mock-data/mock-data';
import { ITrack } from 'src/track/types/track.types';
import { IUser } from 'src/user/types/user.types';

@Injectable()
export class DataService {
  users: Map<string, IUser>;
  tracks: Map<string, ITrack>;

  constructor() {
    this.users = new Map<string, IUser>();
    this.tracks = new Map<string, ITrack>();

    this.users.set(mockedUser.id, mockedUser);
    this.tracks.set(mockedTrack.id, mockedTrack);
  }

  getAllUsers = () => Object.fromEntries(this.users.entries());

  getUserById = (id: string) => this.users.get(id);

  createUser = (id: string, user: IUser) => this.users.set(id, user);

  deleteUser = (id: string) => this.users.delete(id);

  getAllTracks = () => Object.fromEntries(this.tracks.entries());

  getTrackById = (id: string) => this.tracks.get(id);

  createTrack = (id: string, track: ITrack) => this.tracks.set(id, track);

  deleteTrack = (id: string) => this.tracks.delete(id);
}
