import { Injectable } from '@nestjs/common';
import { IAlbum } from 'src/album/types/album.types';
import { IArtist } from 'src/artist/types/artist.types';
import { Favorites } from 'src/favorites/types/favorites.types';
import {
  mockedAlbum,
  mockedArtist,
  mockedTrack,
  mockedUser,
} from 'src/mock-data/mock-data';
import { ITrack } from 'src/track/types/track.types';
import { IUser } from 'src/user/types/user.types';

@Injectable()
export class DataService {
  users: Map<string, IUser>;
  tracks: Map<string, ITrack>;
  artists: Map<string, IArtist>;
  albums: Map<string, IAlbum>;
  favorites: Favorites;

  constructor() {
    this.users = new Map<string, IUser>();
    this.tracks = new Map<string, ITrack>();
    this.artists = new Map<string, IArtist>();
    this.albums = new Map<string, IAlbum>();
    this.favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };

    this.users.set(mockedUser.id, mockedUser);
    this.tracks.set(mockedTrack.id, mockedTrack);
    this.artists.set(mockedTrack.id, mockedArtist);
    this.albums.set(mockedTrack.id, mockedAlbum);
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

  getAllAlbums = () => Object.fromEntries(this.albums.entries());

  getAlbumById = (id: string) => this.albums.get(id);

  createAlbum = (id: string, album: IAlbum) => this.albums.set(id, album);

  deleteAlbum = (id: string) => this.albums.delete(id);

  getAllFavorites = () => {
    const data = {
      artists: [],
      albums: [],
      tracks: [],
    };

    this.favorites.tracks.forEach((id) => {
      data.tracks.push(this.getTrackById(id));
    });
    this.favorites.albums.forEach((id) => {
      data.albums.push(this.getAlbumById(id));
    });
    this.favorites.artists.forEach((id) => {
      data.artists.push(this.getArtistById(id));
    });

    return data;
  };

  addFavorites = (route: string, id: string) => this.favorites[route].push(id);

  deleteFavorites = (route: string, id: string) => {
    const filteredIds = this.favorites[route].filter(
      (currentId) => currentId !== id,
    );

    this.favorites[route] = filteredIds;
  };

  deleteArtistReferences = (id: string) => {
    this.tracks.forEach((track) => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
    this.albums.forEach((album) => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
  };

  deleteAlbumReferences = (id: string) => {
    this.tracks.forEach((track) => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
  };
}
