import { IsString } from 'class-validator';

export class UpdatePostFreeDto {
  @IsString()
  userEmail: string;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
