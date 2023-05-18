import {Controller, Get, Post, Headers, Param, Body} from '@nestjs/common';
import {BoardService} from './board.service';
import {CreateBoardDto} from "./dto/create-board.dto";

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get(':id')
  async getBoardsByProject(@Headers('authorization') token, @Param('id') id: string) {
    return this.boardService.getBoardsByProject(token, +id);
  }

  @Get('current-board/:id')
  async getCurrentBoard(@Param('id') id: string) {
    return this.boardService.getCurrentBoard(+id);
  }

  // , @Headers('authorization') token
  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.createBoard(createBoardDto);
  }
}
