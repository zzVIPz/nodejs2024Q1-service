import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Favorite')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  entryType: string;

  @Column({ type: 'uuid' })
  entryId: string;
}
