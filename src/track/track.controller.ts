import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackInfoDto } from './dto/update-track-info.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  getAllTracks() {
    return this.trackService.getAllTracks();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string) {
    return this.trackService.getTrackById(id);
  }

  @Post()
  createTrack(@Body() createUserDto: CreateTrackDto) {
    return this.trackService.createTrack(createUserDto);
  }

  @Put(':id')
  updateTrackInfo(
    @Param('id') id: string,
    @Body() updateTrackInfoDto: UpdateTrackInfoDto,
  ) {
    return this.trackService.updateTrackInfo(id, updateTrackInfoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteTrack(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
