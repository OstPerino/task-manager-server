import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Project} from "../projects/projects.model";
import {Board} from "./board.model";

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [
      SequelizeModule.forFeature([Board, Project])
  ]
})
export class BoardModule {}
