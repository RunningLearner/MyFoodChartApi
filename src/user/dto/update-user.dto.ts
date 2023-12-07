import { IsBoolean, IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  name: string;

  @IsBoolean()
  isNutritionist: boolean;
}
