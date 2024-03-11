import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './user/user.module';
import { TracksModule } from './track/track.module';
import { ArtistModule } from './artist/artist.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [DataModule, UsersModule, TracksModule, ArtistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
