import { IsString, IsBoolean } from 'class-validator';

export class UpdateMenuDTO {
  @IsString()
  menuName: string;

  @IsBoolean()
  isProductUsed: boolean;

  @IsString()
  productName: string;

  @IsString()
  productBrand: string;
}
