import { IsOptional, IsString } from 'class-validator';

export class UpdateLikeDto {
  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  @IsOptional()
  targetId: string;

  @IsString()
  @IsOptional()
  targetType: string; // 'DietPost', 'DietComment', 'FreePost', 'FreeComment', 'Announcement' 등
}
