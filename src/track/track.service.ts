import { BadRequestException, Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { throwNotFoundException, validateId } from 'src/utils/utils';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackInfoDto } from './dto/update-track-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly db: Repository<Track>,
  ) {}

  getAllTracks = async () => await this.db.find();

  getTrackById = async (id: string) => {
    validateId(id);

    const track = await this.db.findOneBy({ id });

    if (!track) throwNotFoundException(id);

    return track;
  };

  createTrack = async (trackDto: CreateTrackDto) => {
    if (!trackDto.name) throw new BadRequestException(`Name is required`);
    if (!trackDto.duration)
      throw new BadRequestException(`Duration is required`);

    const track = await this.db.save(trackDto);

    return await this.getTrackById(track.id);
  };

  updateTrackInfo = async (id: string, dto: UpdateTrackInfoDto) => {
    if (!dto.name || !dto.duration)
      throw new BadRequestException('Name & Duration are required');

    const track = await this.getTrackById(id);

    await this.db.save({
      ...track,
      ...dto,
    });

    return await this.getTrackById(id);
  };

  deleteTrack = async (id: string) => {
    await this.getTrackById(id);
    await this.db.delete(id);
  };
}
