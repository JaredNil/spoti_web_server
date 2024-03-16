import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
	@ApiProperty({ example: 'sth..username', description: 'Имя пользователя' })
	@IsString({ message: 'Должно быть строкой' })
	@Length(3, 25, { message: 'Не меньше 3 и не больше 25' })
	readonly username: string;
	@ApiProperty({ example: '12345', description: 'Хэш пароля.' })
	@IsString({ message: 'Должно быть строкой' })
	readonly hash: string;
	@ApiProperty({ example: 'salt', description: 'Соль пароля.' })
	@IsString({ message: 'Должно быть строкой' })
	readonly salt: string;
}

export class BanUserDto {
	@ApiProperty({ example: 'userID 3123123', description: 'userID' })
	@IsString({ message: 'Должно быть строкой с ID пользователя.' })
	readonly userId: string;

	@ApiProperty({ example: 'ADMIN | USER', description: 'Любая причина бана пользователя.' })
	@IsString({ message: 'Строчный аргумент' })
	readonly banReason: string;
}

export class AddRoleDto {
	@ApiProperty({ example: 'ADMIN | USER', description: 'Роль клиента приложента относительно прав.' })
	@IsString({ message: 'Должно быть строкой' })
	readonly value: string;
	@ApiProperty({ example: 'userID 3123123', description: 'userID' })
	@IsString({ message: 'Должно быть строкой с ID пользователя.' })
	readonly userId: string;
}
