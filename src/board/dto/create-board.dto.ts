import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  nickname: string;

  @IsString()
  institute: string;

  @IsNumber()
  peopleNum: number;

  @IsNumber()
  price: number;

  @IsString()
  imgUrl: string;

  @IsString()
  menuName: string;

  @IsBoolean()
  isProductUsed: boolean;

  @IsString()
  productName: string;

  @IsString()
  productBrand: string;

  @IsString()
  explanation: string;

  @IsString()
  fileURL: string;

  @IsString()
  boardType: string;
}
