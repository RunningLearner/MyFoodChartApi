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
  // 여기에 다른 필요한 생성 필드를 추가할 수 있습니다.
}
