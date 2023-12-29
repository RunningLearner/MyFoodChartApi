import { IsString, IsOptional } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsString()
  @IsOptional()
  userRole: string;
  // 여기에 다른 수정 가능한 필드를 추가할 수 있습니다.
}
