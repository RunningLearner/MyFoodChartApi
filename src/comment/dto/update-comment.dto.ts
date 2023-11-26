import { IsString, IsOptional } from 'class-validator';

export class UpdateCommentDietDto {
  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsString()
  userEmail: string;
  // 여기에 다른 수정 가능한 필드를 추가할 수 있습니다.
}
