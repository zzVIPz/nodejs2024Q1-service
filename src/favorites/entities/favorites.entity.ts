import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { FavoritesEnum } from '../types/favorites.types';

@Entity('Favorite')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  entryType: FavoritesEnum;

  @Column({ type: 'uuid' })
  entryId: string;
}
