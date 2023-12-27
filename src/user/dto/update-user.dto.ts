import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  nickname?: string;

  @IsBoolean()
  @IsOptional()
  isNutritionist?: boolean;
}
