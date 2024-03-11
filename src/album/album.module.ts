import { Module } from '@nestjs/common';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { DataModule } from 'src/data/data.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
  imports: [DataModule],
})
export class AlbumModule {}
