import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { Album } from 'src/album/album.model';
import { FileService, FileType } from 'src/file/file.service';

import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { TrackService } from './../track/track.service';
import { AlbumService } from 'src/album/album.service';

@Injectable({})
export class UsersService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		@InjectModel(Album) private albumRepository: typeof Album,
		private fileService: FileService,
		private trackService: TrackService,
		private albumService: AlbumService
	) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto);
		// const role = await this.roleService.getRoleByValue('USER');
		// await user.$set('roles', [role.id]);
		// user.roles = [role];
		return user;
	}

	async nullUsersDatabase() {
		try {
			const res = this.userRepository.destroy({ truncate: true, cascade: true });
		} catch (error) {
			console.log(error);
		}
		const userCommon = await this.userRepository.create({ email: 'common', password: 'common' });

		const albumLiked = await this.albumRepository.create({
			name: 'Liked',
			userId: userCommon.id,
		});

		const albumLiked2 = await this.albumRepository.create({
			name: 'Second ps',
			userId: userCommon.id,
		});

		const albumLiked3 = await this.albumRepository.create({
			name: 'Third ps',
			userId: userCommon.id,
		});

		await this.userRepository.update({ albums: [albumLiked] }, { where: { id: userCommon.id } });
		const user1 = await this.userRepository.findOne({ include: { all: true }, where: { id: userCommon.id } });
		// await this.albumService.pushTrack(user1.albums[0].id);
		const albumStack1 = [...user1.albums];
		// await this.fileService.pushInitTracks(user1.albums[0]);
		const track = await this.pushInitTracks(user1.albums[0].id, '1');

		await this.userRepository.update({ albums: [...albumStack1, albumLiked2] }, { where: { id: userCommon.id } });
		const user2 = await this.userRepository.findOne({ include: { all: true }, where: { id: userCommon.id } });
		// await this.albumService.pushTrack(user2.albums[1].id);
		const albumStack2 = [...user2.albums];

		await this.userRepository.update({ albums: [...albumStack2, albumLiked3] }, { where: { id: userCommon.id } });
		const user3 = await this.userRepository.findOne({ include: { all: true }, where: { id: userCommon.id } });
		// await this.albumService.pushTrack(user3.albums[2].id);

		return await this.getAllUsers();
	}

	async pushInitTracks(albumId: number, albumFolder: string) {
		const folderPathMain = path.resolve('C:\\MAIN__FILES\\FOR_WEB\\spotic_server\\src\\InitTracks\\');

		let fileList = fs.readdirSync(path.resolve(folderPathMain, albumFolder));

		fileList = fileList.map((file) => path.resolve(folderPathMain, albumFolder, file));

		let result = '';

		fileList.forEach((filePath) => {
			fs.readFile(filePath, async (_, data) => {
				const fileInstance = {
					audio: [
						{
							buffer: data,
							size: data.byteLength,
						},
					],
				};

				const track = await this.trackService.create(fileInstance.audio[0] , albumId);
				await this.albumService.pushTrack(albumId, track);
			});
		});
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll({ include: { all: true } });
		return users;
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({ where: { email }, include: { all: true } });
		return user;
	}

	// async addRole(dto: AddRoleDto) {
	// 	const user = await this.userRepository.findByPk(dto.userId);
	// 	const role = await this.roleService.getRoleByValue(dto.value);
	// 	if (role && user) {
	// 		await user.$add('role', role.id);
	// 		return dto;
	// 	}
	// 	throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
	// }

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
