import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {User} from './users.model';
import {CreateUserDto} from './dto/create-user.dto';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User, private jwtService: JwtService) {
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);
    return user;
  }

  async getAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getOne(id: number) {
    const user = await this.userRepository.findOne({where: {id}});
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({where: {email}});
    return user;
  }

  async decode(token: string): Promise<any> {
    const decoded = this.jwtService.decode(token.split(" ")[1]);
    return decoded;
  }
}
