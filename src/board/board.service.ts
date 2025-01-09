import { Inject, Injectable, UseGuards } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';
import { Model } from 'mongoose';
import { ResponseBoarDto } from './dto/response-board.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/global/globalEnum';

@Injectable()
export class BoardService {
  constructor(
    @Inject('BOARD_MODEL')
    private readonly BoardModel : Model<Board>
  ){}
  async create(createBoardDto: CreateBoardDto):Promise<Board> {
    try {
      const newBoard = await this.BoardModel.create(createBoardDto);
      return newBoard;
    } catch (error) {
      return error;
    }

  }

  @Roles([Role.USER, Role.ADMIN])
  async findAll() {
    return await this.BoardModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} board`;
  }

  update(id: number, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: number) {
    return `This action removes a #${id} board`;
  }
}
