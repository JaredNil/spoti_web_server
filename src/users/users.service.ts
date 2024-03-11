import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable({})
export class UsersService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private roleService: RolesService
	) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto);
		const role = await this.roleService.getRoleByValue('USER');
		await user.$set('roles', [role.id]);
		user.roles = [role];
		return user;
	}

	async nullUsersDatabase() {
		try {
			const res = this.userRepository.destroy({ truncate: true, cascade: true });
			console.log(res);
		} catch (error) {
			console.log(error);
		}
		const userCommon = await this.userRepository.create({ email: 'common', password: 'common' });
		// const role = await this.roleService.getRoleByValue('ADMIN');
		// await userCommon.$set('roles', [role.id]);
		const users = await this.getAllUsers();
		return users;
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll({ include: { all: true } });
		return users;
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
		return user;
	}

	async addRole(dto: AddRoleDto) {
		const user = await this.userRepository.findByPk(dto.userId);
		const role = await this.roleService.getRoleByValue(dto.value);
		if (role && user) {
			await user.$add('role', role.id);
			return dto;
		}
		throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
	}

	async ban(dto: BanUserDto) {
		const user = await this.userRepository.findByPk(dto.userId);
		if (!user) {
			throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
		}
		user.banned = true;
		user.banReason = dto.banReason;
		await user.save();
		return user;
	}
}
