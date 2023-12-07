import { IsArray, IsString } from 'class-validator';
import { CreateMenuDTO } from './create-menu.dto';

export class CreatePostDietDto {
  @IsString()
  userEmail: string;

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
  recipeFile: string;

  @IsString()
  whichSchool: string;

  @IsArray()
  menues: CreateMenuDTO[];
}
