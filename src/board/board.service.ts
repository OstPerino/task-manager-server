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

  async createBoard(createBoardDto: CreateBoardDto) {
    const board = await this.boardRepository.create(createBoardDto);
    return board;
    // const decoded = await this.usersService.decode(token);
    // const user = await this.usersService.getUserByEmail(decoded.email);
    //
    // await this.usersBoards.create({
    //   userId: user.id,
    //   boardId: board.id
    // });
    //
    // if (!user.id) {
    //   throw new HttpException('Пользователь с таким email не зарегестрирован', HttpStatus.BAD_REQUEST);
    // }
    //
    // await board.$set('users', [user.id]);
    // return board;
  }

  async getBoardsByProject(token: string, id: number) {
    return this.boardRepository.findAll({where:{projectId: id}})
    // const decoded = await this.usersService.decode(token);
    // const usersBoards = await this.usersBoards.findAll({where:{userId: decoded.id}, include: {all:true}});
    // const usersIds = usersBoards.map(user => user.id);
    // const users = await this.boardRepository.findAll({ where: { id: usersIds }, include: {all: true}});
    // return users;
  }
}
