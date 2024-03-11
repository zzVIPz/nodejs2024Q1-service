import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { DataModule } from 'src/data/data.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [DataModule],
})
export class UsersModule {}
