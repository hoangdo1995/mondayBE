import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { ResponseData } from 'src/global/responseData';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { Board } from './entities/board.entity';
import { ResponseBoarDto } from './dto/response-board.dto';
import { BoardResolver } from './board.resolver';

@Controller('board')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly boardsResolver: BoardResolver
  ) {}

  @Post()
  async create(@Body() createBoardDto: CreateBoardDto):Promise<ResponseData<Board|null>> {
      try {
        return new ResponseData<Board>(HttpStatus.SUCCESS, HttpMessage.SUCCESS, await this.boardsResolver.createBoard(createBoardDto));
      } catch (error) {
        return new ResponseData<null>(HttpStatus.BAD_REQUEST, HttpMessage.BAD_REQUEST, null, error.toString());
      }
  }

  @Get()
  async findAll() {
    try {
      return new ResponseData<Board>(HttpStatus.SUCCESS, HttpMessage.SUCCESS, await this.boardsResolver.getBoards());
    } catch (error) {
      return new ResponseData<null>(HttpStatus.BAD_REQUEST, HttpMessage.BAD_REQUEST, null, error.toString());
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
