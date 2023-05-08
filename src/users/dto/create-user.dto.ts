import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'email@gmail.com',
        description: 'Email пользователя',
    })
    readonly email: string;
    @ApiProperty({
        example: '12345678',
        description: 'Пароль пользователя',
    })
    readonly password: string;
    @ApiProperty({example: 'David', description: 'Имя пользователя'})
    readonly firstName: string;
    @ApiProperty({example: 'Miller', description: 'Фамилия пользователя'})
    readonly lastName: string;
}
