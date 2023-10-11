import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardServiceFactory } from './ board-service.factory';
import { JwtGuard } from 'src/common/gurads/jwt.guard';

@Controller('boards/:type')
export class BoardController {
  constructor(private readonly boardServiceFactory: BoardServiceFactory) {}

  @UseGuards(JwtGuard)
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
