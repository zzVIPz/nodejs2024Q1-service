import { IArtist } from '../types/artist.types';

export class Artist implements IArtist {
  id: string;
  name: string;
  grammy: boolean;

  constructor({ id, name, grammy }: IArtist) {
    this.id = id;
    this.name = name;
    this.grammy = grammy;
  }
}
