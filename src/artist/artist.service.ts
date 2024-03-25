import { BadRequestException, Injectable } from '@nestjs/common';
import { Artist } from './entities/artist.entity';
import { throwNotFoundException, validateId } from 'src/utils/utils';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistInfoDto } from './dto/update-artist-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly db: Repository<Artist>,
  ) {}

  getAllArtists = async () => await this.db.find();

  getArtistById = async (id: string) => {
    validateId(id);

    const artist = await this.db.findOneBy({ id });

    if (!artist) throwNotFoundException(id);

    return artist;
  };

  createArtist = async (artistDto: CreateArtistDto) => {
    if (!artistDto.name) throw new BadRequestException(`Name is required`);
    if (!artistDto.grammy) throw new BadRequestException(`Grammy is required`);

    const artist = await this.db.save(artistDto);

    return await this.getArtistById(artist.id);
  };

  updateArtistInfo = async (id: string, dto: UpdateArtistInfoDto) => {
    if (!dto.name || typeof dto.grammy !== 'boolean')
      throw new BadRequestException('Name & Grammy are required');

    await this.getArtistById(id);
    await this.db.save({ id, ...dto });

    return await this.getArtistById(id);
  };

  deleteArtist = async (id: string) => {
    await this.getArtistById(id);
    await this.db.delete(id);
  };
}
