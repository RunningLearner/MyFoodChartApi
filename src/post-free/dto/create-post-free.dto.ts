import { IsArray, IsString } from 'class-validator';

export class CreatePostFreeDto {
  @IsString()
  userEmail: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  username: string;
}
