import { IsString, IsBoolean } from 'class-validator';

export class CreateMenuDTO {
  @IsString()
  menuName: string;

  @IsBoolean()
  isProductUsed: boolean;

  @IsString()
  productName: string;

  @IsString()
  productBrand: string;
}
