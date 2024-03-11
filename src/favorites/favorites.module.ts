import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { DataModule } from 'src/data/data.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [DataModule],
})
export class FavoritesModule {}
