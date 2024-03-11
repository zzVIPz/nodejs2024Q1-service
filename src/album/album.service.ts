import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DataService } from 'src/data/data.service';
import { Album } from './entities/album.entity';
import { throwNotFoundException, validateId } from 'src/utils/utils';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumInfoDto } from './dto/update-album-info.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly db: DataService) {}

  getAllAlbums = () => Object.values(this.db.getAllAlbums());

  getAlbumById = (id: string) => {
    validateId(id);

    const album = this.db.getAlbumById(id);

    if (!album) throwNotFoundException(id);

    return album;
  };

  createAlbum = ({ name, year, artistId }: CreateAlbumDto) => {
    if (!name) throw new BadRequestException(`Name is required`);
    if (!year) throw new BadRequestException(`Year is required`);

    const album = new Album({
      id: uuidv4(),
      name,
      year,
      artistId,
    });

    this.db.createAlbum(album.id, album);

    return this.getAlbumById(album.id);
  };

  updateAlbumInfo = (id: string, dto: UpdateAlbumInfoDto) => {
    if (!dto.name || !dto.year || typeof dto.year !== 'number')
      throw new BadRequestException('Name & Grammy are required');

    this.getAlbumById(id);
    this.db.createAlbum(id, { id, ...dto });

    return this.getAlbumById(id);
  };

  deleteAlbum = (id: string) => {
    this.getAlbumById(id);
    this.db.deleteAlbumReferences(id);
    this.db.deleteFavorites('albums', id);
    this.db.deleteAlbum(id);
  };
}
