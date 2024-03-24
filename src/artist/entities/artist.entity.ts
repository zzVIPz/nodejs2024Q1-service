import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IArtist } from '../types/artist.types';
import { Album } from 'src/album/entities/album.entity';

@Entity('Artist')
export class Artist implements IArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artistId)
  albums: Album;
}
