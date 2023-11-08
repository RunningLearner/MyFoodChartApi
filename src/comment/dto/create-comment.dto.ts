import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCommentDietDto {
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  userEmail: string;
  // 여기에 다른 필요한 생성 필드를 추가할 수 있습니다.
}
