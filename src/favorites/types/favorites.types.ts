export interface Favorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export enum FavoritesEnum {
  track = 'track',
  album = 'album',
  artist = 'artist',
}
