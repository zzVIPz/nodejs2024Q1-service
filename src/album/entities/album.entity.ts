import { IAlbum } from '../types/album.types';

export class Album implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor({ id, name, year, artistId }: IAlbum) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.artistId = artistId;
  }
}
