import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataService } from 'src/data/data.service';
import { validateId } from 'src/utils/utils';

@Injectable()
export class FavoritesService {
  constructor(private readonly db: DataService) {}

  getAllFavorites = () => this.db.getAllFavorites();

  addFavorites = (route: string, id: string) => {
    validateId(id);

    let isEntityExist = false;

    if (route === 'track') {
      isEntityExist = !!this.db.getTrackById(id);
    }

    if (route === 'album') {
      isEntityExist = !!this.db.getAlbumById(id);
    }

    if (route === 'artist') {
      isEntityExist = !!this.db.getArtistById(id);
    }

    if (!isEntityExist) {
      throw new HttpException(
        `Id ${id} doesn't exist in ${route}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    this.db.addFavorites(`${route}s`, id);
  };

  deleteFavorites = (route: string, id: string) => {
    validateId(id);

    const formattedRoute = `${route}s`;
    const isIdExistsInFavorites =
      this.db.favorites[formattedRoute].includes(id);

    if (!isIdExistsInFavorites) {
      throw new NotFoundException(`Id ${id} doesn't exist in ${route}`);
    }

    this.db.deleteFavorites(formattedRoute, id);
  };
}
