import {Body, Controller, Get, Headers, Param, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('/login')
    login(@Body() createUserDto: CreateUserDto) {
        return this.authService.login(createUserDto);
    }

    @Post('/registration')
    registration(@Body() createUserDto: CreateUserDto) {
        return this.authService.registration(createUserDto);
    }

    // TODO: Add /check-auth
    @Get('/check')
    checkAuth(@Headers('authorization') token) {
        return this.authService.checkAuth(token);
    }
}
