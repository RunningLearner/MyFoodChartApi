import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateLikeDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  targetId: number;

  @IsString()
  @IsNotEmpty()
  targetType: string; // 'DietPost', 'DietComment', 'FreePost', 'FreeComment', 'Announcement' 등
}
