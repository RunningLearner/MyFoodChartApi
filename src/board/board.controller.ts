import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardServiceFactory } from './ board-service.factory';

@Controller('boards/:type')
export class BoardController {
  constructor(private readonly boardServiceFactory: BoardServiceFactory) {}

  @Post()
  create(@Param('type') type: string, @Body() createDto: CreateBoardDto) {
    const boardService = this.boardServiceFactory.getService(type);
    return boardService.create(createDto);
  }

  @Get()
  findAll(@Param('type') type: string) {
    const boardService = this.boardServiceFactory.getService(type);
    return boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('type') type: string, @Param('id') id: string) {
    const boardService = this.boardServiceFactory.getService(type);
    return boardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    const boardService = this.boardServiceFactory.getService(type);
    return boardService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('type') type: string, @Param('id') id: string) {
    const boardService = this.boardServiceFactory.getService(type);
    return boardService.remove(+id);
  }
}
