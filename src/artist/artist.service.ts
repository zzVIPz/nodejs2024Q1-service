import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DataService } from 'src/data/data.service';
import { Artist } from './entities/artist.entity';
import { throwNotFoundException, validateId } from 'src/utils/utils';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistInfoDto } from './dto/update-artist-info.dto';

@Injectable()
export class ArtistService {
  constructor(private readonly db: DataService) {}

  getAllArtists = () => Object.values(this.db.getAllArtists());

  getArtistById = (id: string) => {
    validateId(id);

    const artist = this.db.getArtistById(id);

    if (!artist) throwNotFoundException(id);

    return artist;
  };

  createArtist = ({ name, grammy }: CreateArtistDto) => {
    if (!name) throw new BadRequestException(`Name is required`);
    if (!grammy) throw new BadRequestException(`Grammy is required`);

    const artist = new Artist({
      id: uuidv4(),
      name,
      grammy,
    });

    this.db.createArtist(artist.id, artist);

    return this.getArtistById(artist.id);
  };

  updateArtistInfo = (id: string, dto: UpdateArtistInfoDto) => {
    if (!dto.name || typeof dto.grammy !== 'boolean')
      throw new BadRequestException('Name & Grammy are required');

    this.getArtistById(id);
    this.db.createArtist(id, { id, ...dto });

    return this.getArtistById(id);
  };

  deleteArtist = (id: string) => {
    this.getArtistById(id);
    this.db.deleteArtistReferences(id);
    this.db.deleteFavorites('artists', id);
    this.db.deleteArtist(id);
  };
}
