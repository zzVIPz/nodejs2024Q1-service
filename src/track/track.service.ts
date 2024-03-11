import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DataService } from 'src/data/data.service';
import { Track } from './entities/track.entity';
import { throwNotFoundException, validateId } from 'src/utils/utils';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackInfoDto } from './dto/update-track-info.dto';

@Injectable()
export class TrackService {
  constructor(private readonly db: DataService) {}

  getAllTracks = () => Object.values(this.db.getAllTracks());

  getTrackById = (id: string) => {
    validateId(id);

    const track = this.db.getTrackById(id);

    if (!track) throwNotFoundException(id);

    return track;
  };

  createTrack = ({ name, artistId, albumId, duration }: CreateTrackDto) => {
    if (!name) throw new BadRequestException(`Name is required`);
    if (!duration) throw new BadRequestException(`Duration is required`);

    const track = new Track({
      id: uuidv4(),
      name,
      artistId,
      albumId,
      duration,
    });

    this.db.createTrack(track.id, track);

    return this.getTrackById(track.id);
  };

  updateTrackInfo = (id: string, dto: UpdateTrackInfoDto) => {
    if (!dto.name || !dto.duration)
      throw new BadRequestException('Name & Duration are required');

    const track = this.getTrackById(id);

    this.db.createTrack(id, {
      ...track,
      ...dto,
    });

    return this.getTrackById(id);
  };

  deleteTrack = (id: string) => {
    this.getTrackById(id);
    this.db.deleteFavorites('tracks', id);
    this.db.deleteTrack(id);
  };
}
