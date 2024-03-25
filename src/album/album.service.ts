import { BadRequestException, Injectable } from '@nestjs/common';
import { Album } from './entities/album.entity';
import { throwNotFoundException, validateId } from 'src/utils/utils';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumInfoDto } from './dto/update-album-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly db: Repository<Album>,
  ) {}

  getAllAlbums = async () => await this.db.find();

  getAlbumById = async (id: string) => {
    validateId(id);

    const album = await this.db.findOneBy({ id });

    if (!album) throwNotFoundException(id);

    return album;
  };

  createAlbum = async (albumDto: CreateAlbumDto) => {
    if (!albumDto.name) throw new BadRequestException(`Name is required`);
    if (!albumDto.year) throw new BadRequestException(`Year is required`);

    const album = await this.db.save(albumDto);

    return await this.getAlbumById(album.id);
  };

  updateAlbumInfo = async (id: string, dto: UpdateAlbumInfoDto) => {
    if (!dto.name || !dto.year || typeof dto.year !== 'number')
      throw new BadRequestException('Name & Grammy are required');

    await this.getAlbumById(id);
    await this.db.save({ id, ...dto });

    return await this.getAlbumById(id);
  };

  deleteAlbum = async (id: string) => {
    await this.getAlbumById(id);
    await this.db.delete(id);
  };
}
