import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artist/artist.module';
import { TracksModule } from 'src/track/track.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorites.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    AlbumModule,
    ArtistModule,
    TracksModule,
  ],
})
export class FavoritesModule {}
