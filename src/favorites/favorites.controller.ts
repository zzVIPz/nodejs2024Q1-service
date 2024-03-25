import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAllFavorites();
  }

  @Post(':route/:id')
  addFavorites(@Param('route') route: string, @Param('id') id: string) {
    return this.favoritesService.addFavorites(route, id);
  }

  @Delete(':route/:id')
  @HttpCode(204)
  deleteFavorites(@Param('route') route: string, @Param('id') id: string) {
    return this.favoritesService.deleteFavorites(route, id);
  }
}
