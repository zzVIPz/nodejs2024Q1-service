import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  year: number;

  @IsOptional()
  @IsString()
  artistId: string | null;
}
