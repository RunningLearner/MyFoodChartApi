import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardServiceFactory } from './ board-service.factory';
import { JwtGuard } from '../common/gurads/jwt.guard';
import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('boards')
export class BoardController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
    private readonly boardServiceFactory: BoardServiceFactory,
  ) {}

  @UseGuards(JwtGuard)
  @Post('/:type')
  create(@Param('type') type: string, @Body() createDto: CreateBoardDto) {
    try {
      this.logger.info('게시글 생성 컨르롤러 호출됨.');
      console.log(type);
      const boardService = this.boardServiceFactory.getService(type);
      this.logger.info(`생성된 서비스 : ${boardService}`);
      return boardService.create(createDto);
    } catch (e) {
      this.logger.warn(
        `게시글 생성 컨트롤러 예외 발생. Error: ${e.message} Stack Trace: ${e.stack}`,
      );
    }
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
