import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {AuthUserDto} from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async login(authUserDto: AuthUserDto) {
    const user = await this.validateUser(authUserDto);
    return this.generateToken(user);
  }

  async registration(createUserDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(
      createUserDto.email,
    );

    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hash = await bcrypt.hash(createUserDto.password, 5);
    const user = await this.userService.create({
      ...createUserDto,
      password: hash,
    });
    return await this.generateToken(user);
  }

  private async generateToken(user) {
    const payload = {email: user.email, id: user.id};
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(authUserDto: AuthUserDto) {
    const user = await this.userService.getUserByEmail(authUserDto.email);
    const passwordEquals = await bcrypt.compare(
      authUserDto.password,
      user.password,
    );

    if (user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.userService.getUserByEmail(email);
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        user.password
      );
      if (!isPasswordMatching) {
        throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  async checkAuth(token: string) {
    const decoded = await this.userService.decode(token);
    const user = this.userService.getUserByEmail(decoded.email);
    return user;
  }
}
