import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardProvider } from './board.provider';
import { DatabaseModule } from 'src/database/database.module';
import { BoardService } from './board.service';
import { BoardResolver } from './board.resolver';

@Module({
  imports:[DatabaseModule],
  controllers: [BoardController],
  providers: [...BoardProvider, BoardService, BoardResolver],
})
export class BoardModule {}
