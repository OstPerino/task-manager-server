import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UsersService} from "../users/users.service";
import {Board} from "./board.model";
import {UsersBoards} from "./user-boards.model";
import {CreateBoardDto} from "./dto/create-board.dto";

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board) private boardRepository: typeof Board,
    @InjectModel(UsersBoards) private usersBoards: typeof UsersBoards,
    private usersService: UsersService,
  ) {
  }

  // TODO: Invite user to board

  async createBoard(createBoardDto: CreateBoardDto) {
    const board = await this.boardRepository.create(createBoardDto);
    return board;
  }

  async getBoardsByProject(token: string, id: number) {
    return this.boardRepository.findAll({where: {projectId: id}, include: {all: true}});
  }

  async getCurrentBoard(id: number) {
    const board = await this.boardRepository.findOne({where: {id}});
    return board;
  }
}
