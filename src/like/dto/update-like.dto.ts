import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateLikeDto {
  @IsInt()
  @IsOptional()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  targetId: number;

  @IsString()
  @IsNotEmpty()
  targetType: string; // 'DietPost', 'DietComment', 'FreePost', 'FreeComment', 'Announcement' 등
}
