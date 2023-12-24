import { IsArray, IsOptional, IsString } from 'class-validator';
import { CreateMenuDTO } from './create-menu.dto';

export class CreatePostDietDto {
  @IsString()
  date: string;

  @IsString()
  institute: string;

  @IsString()
  peopleNum: string;

  @IsString()
  price: string;

  @IsString()
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
  menues: CreateMenuDTO[];
}
