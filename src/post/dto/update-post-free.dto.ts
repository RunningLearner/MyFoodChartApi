import { IsArray, IsString } from 'class-validator';

export class CreatePostFreeDto {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
