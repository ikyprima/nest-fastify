
import { IsOptional, IsString } from 'class-validator';

export class CreateKategoriDto {
  @IsString()
  nama: string;

  @IsOptional()
  @IsString()
  singkatan?: string;
}
