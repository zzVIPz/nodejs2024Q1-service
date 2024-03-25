import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validateId } from 'src/utils/utils';
import { Favorite } from './entities/favorites.entity';
import { Repository } from 'typeorm';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';
import { Favorites } from './types/favorites.types';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly db: Repository<Favorite>,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
    private readonly trackService: TrackService,
  ) {}

  getServiceById = async (route: string, id: string) => {
    const serviceName = `${route}Service`;
    const serviceMethod = `get${route.charAt(0).toUpperCase()}${route.slice(1)}ById`;

    return await this[serviceName][serviceMethod](id);
  };

  getAllFavorites = async () => {
    const entries = await this.db.find();
    const data: Favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };

    for (const { entryType, entryId } of entries) {
      let entryData = undefined;

      try {
        entryData = await this.getServiceById(entryType, entryId);
      } catch {}

      if (entryData) data[`${entryType}s`].push(entryData);
    }
    return data;
  };

  getFavorite = async (entryType, entryId) =>
    await this.db.findOneBy({ entryType, entryId });

  addFavorites = async (route: string, id: string) => {
    validateId(id);

    try {
      await this.getServiceById(route, id);
    } catch {
      throw new HttpException(
        `Id ${id} doesn't exist in ${route}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const hasFavoriteEntry = await this.getFavorite(route, id);

    if (!hasFavoriteEntry) {
      await this.db.save({
        entryType: route,
        entryId: id,
      });
    }
  };

  deleteFavorites = async (route: string, id: string) => {
    validateId(id);

    const entry = await this.getFavorite(route, id);

    if (!entry) {
      throw new NotFoundException(`Id ${id} doesn't exist in ${route}`);
    }

    await this.db.delete(entry.id);
  };
}
