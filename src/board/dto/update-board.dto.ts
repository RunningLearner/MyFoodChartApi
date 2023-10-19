import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-post.dto';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
