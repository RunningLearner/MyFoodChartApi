import { IsString, IsArray, IsOptional } from 'class-validator';
import { UpdateMenuDTO } from './update-menu.dto';

export class UpdatePostDietDto {
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  date: string;

  @IsString()
  institute: string;

  @IsString()
  peopleNum: string;

  @IsString()
  price: string;

  @IsString()
  @IsOptional()
  recipeImg: string;

  @IsString()
  explanation: string;

  @IsString()
  @IsOptional()
  recipeFile: string;

  @IsString()
  @IsOptional()
  whichSchool: string;

  @IsArray()
  menues: UpdateMenuDTO[];
}
