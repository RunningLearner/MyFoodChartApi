import { IsString } from 'class-validator';

export class UpdateUserPhotoDTO {
  @IsString()
  userImg: string;
}
