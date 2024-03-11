import { Injectable } from '@nestjs/common';
import { IArtist } from 'src/artist/types/artist.types';
import { mockedArtist, mockedTrack, mockedUser } from 'src/mock-data/mock-data';
import { ITrack } from 'src/track/types/track.types';
import { IUser } from 'src/user/types/user.types';

@Injectable()
export class DataService {
  users: Map<string, IUser>;
  tracks: Map<string, ITrack>;
  artists: Map<string, IArtist>;

  constructor() {
    this.users = new Map<string, IUser>();
    this.tracks = new Map<string, ITrack>();
    this.artists = new Map<string, IArtist>();

    this.users.set(mockedUser.id, mockedUser);
    this.tracks.set(mockedTrack.id, mockedTrack);
    this.artists.set(mockedTrack.id, mockedArtist);
  }

  getAllUsers = () => Object.fromEntries(this.users.entries());

  getUserById = (id: string) => this.users.get(id);

  createUser = (id: string, user: IUser) => this.users.set(id, user);

  deleteUser = (id: string) => this.users.delete(id);

  getAllTracks = () => Object.fromEntries(this.tracks.entries());

  getTrackById = (id: string) => this.tracks.get(id);

  createTrack = (id: string, track: ITrack) => this.tracks.set(id, track);

  deleteTrack = (id: string) => this.tracks.delete(id);

  getAllArtists = () => Object.fromEntries(this.artists.entries());

  getArtistById = (id: string) => this.artists.get(id);

  createArtist = (id: string, artist: IArtist) => this.artists.set(id, artist);

  deleteArtist = (id: string) => this.artists.delete(id);

  deleteArtistReferences = (id: string) => {
    Object.values(this.getAllTracks()).forEach((track) => {
      if (track.id === id) {
        this.createTrack(id, { ...track, artistId: null });
      }
    });
  };
}
