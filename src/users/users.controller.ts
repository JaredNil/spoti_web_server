import { Body, Controller, Delete, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.model';
import { Roles } from 'src/auth/auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

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
	@UseGuards(RolesGuard)
	@Get()
	getAll() {
		return this.usersService.getAllUsers();
	}

	@ApiOperation({ summary: 'Удалить всю базу данных' })
	// @ApiResponse({ status: 200, type: [User] })
	// @Roles('ADMIN')
	// @UseGuards(RolesGuard)
	@Delete()
	nullUsersDatabase() {
		return this.usersService.nullUsersDatabase();
	}

	@ApiOperation({ summary: 'Выдать роль' })
	@ApiResponse({ status: 200 })
	// @Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/role')
	addRole(@Body() dto: AddRoleDto) {
		return this.usersService.addRole(dto);
	}

	@ApiOperation({ summary: 'Забанить пользователя' })
	@ApiResponse({ status: 200 })
	// @Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('/ban')
	ban(@Body() dto: BanUserDto) {
		return this.usersService.ban(dto);
	}
}
