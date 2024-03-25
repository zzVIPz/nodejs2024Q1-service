import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IAlbum } from '../types/album.types';
import { Artist } from 'src/artist/entities/artist.entity';

@Entity('Album')
export class Album implements IAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Artist, { onDelete: 'SET NULL' })
  artist: Artist;
}
