import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SignDto {
	@ApiProperty({ example: 'usernameExmpl', description: 'Имя пользователя' })
	@IsString({ message: 'Должно быть строкой' })
	@Length(3, 25, { message: 'Не меньше 3 и не больше 25' })
	readonly username: string;

	@ApiProperty({ example: '12345', description: 'Пароль с клиента.' })
	@IsString({ message: 'Должно быть строкой' })
	readonly password: string;
}

export class SessionDto {
	@ApiProperty({ example: 0, description: 'ID user' })
	readonly id: number;

	@ApiProperty({ example: 'usernameExmpl', description: 'Имя пользователя' })
	@IsString({ message: 'Должно быть строкой' })
	@Length(3, 25, { message: 'Не меньше 3 и не больше 25' })
	readonly username: string;

	@ApiProperty()
	readonly 'iat': number;

	@ApiProperty()
	readonly 'exp': number;
}

export class GetSessionDto {
	token: string;
}
