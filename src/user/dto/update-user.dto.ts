import { IsBoolean, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  name: string;

  @IsString()
  nickname: string;

  @IsBoolean()
  isNutritionist: boolean;
}
