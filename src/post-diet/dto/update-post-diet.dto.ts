import { IsString, IsArray } from 'class-validator';
import { UpdateMenuDTO } from './update-menu.dto';

export class UpdatePostDietDto {
  @IsString()
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
  recipeImg: string;

  @IsString()
  explanation: string;

  @IsString()
  recipeFile: string;

  @IsString()
  whichSchool: string;

  @IsArray()
  menues: UpdateMenuDTO[];
}
