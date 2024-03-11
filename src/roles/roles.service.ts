import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './roles.model';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesService {
	constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

	async createRole(dto: CreateRoleDto) {
		const role = await this.roleRepository.create(dto);
		return role;
	}

	async getRoleByValue(value: string) {
		const role = await this.roleRepository.findOne({ where: { value } });
		return role;
	}

	async getAllRoles() {
		const roles = await this.roleRepository.findAll({ include: { all: true } });
		return roles;
	}

	async nullRolesDatabase() {
		const res = await this.roleRepository.destroy({ truncate: true, cascade: true });
		// const userCommon = await this.userRepository.create({ email: 'common', password: 'common' });
		// const role = await this.roleService.getRoleByValue('ADMIN');
		// await userCommon.$set('roles', [role.id]);
		const roles = await this.getAllRoles();
		return roles;
	}
}
