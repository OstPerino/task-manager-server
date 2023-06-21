import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание нового пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getOne(+id);
  }
}
