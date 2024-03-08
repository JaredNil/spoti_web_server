import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class AddRoleDto {
	@ApiProperty({ example: 'ADMIN | USER', description: 'Роль клиента приложента относительно прав.' })
	@IsString({ message: 'Должно быть строкой' })
	readonly value: string;
	@ApiProperty({ example: 'userID 3123123', description: 'userID' })
	@IsString({ message: 'Должно быть строкой с ID пользователя.' })
	readonly userId: string;
}
