import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';

@ApiTags('Польтзователи')
@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@ApiOperation({ summary: 'Создание пользователя Spotify' })
	@ApiResponse({ status: 200, type: User })
	@Post()
	create(@Body() userDto: CreateUserDto) {
		return this.usersService.createUser(userDto);
	}

	@ApiOperation({ summary: 'Получить всех пользователей приложения Spotify' })
	@ApiResponse({ status: 200, type: [User] })
	// @Roles('ADMIN')
	// @UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}

	// @ApiOperation({ summary: 'Выдать роль' })
	// @ApiResponse({ status: 200 })
	// // @Roles('ADMIN')
	// // @UseGuards(RolesGuard)
	// @Post('/role')
	// addRole(@Body() dto: AddRoleDto) {
	// 	return this.usersService.addRole(dto);
	// }

	// @ApiOperation({ summary: 'Забанить пользователя' })
	// @ApiResponse({ status: 200 })
	// // @Roles('ADMIN')
	// // @UseGuards(RolesGuard)
	// @Post('/ban')
	// ban(@Body() dto: BanUserDto) {
	// 	return this.usersService.ban(dto);
	// }
}
