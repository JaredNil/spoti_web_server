import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class BanUserDto {
	@ApiProperty({ example: 'userID 3123123', description: 'userID' })
	@IsString({ message: 'Должно быть строкой с ID пользователя.' })
	readonly userId: string;

	@ApiProperty({ example: 'ADMIN | USER', description: 'Любая причина бана пользователя.' })
	@IsString({ message: 'Строчный аргумент' })
	readonly banReason: string;
}
