import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsString()
  userEmail: string;

  @IsString()
  type: string;
}
