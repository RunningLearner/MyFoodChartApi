import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BoardDietService } from './board-diet.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardDietervice: BoardDietService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardDietervice.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardDietervice.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardDietervice.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardDietervice.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardDietervice.remove(+id);
  }
}
