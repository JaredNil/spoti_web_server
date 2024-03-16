import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesService } from 'src/roles/roles.service';
import { Album } from 'src/album/album.model';
import { FileService, FileType } from 'src/file/file.service';

import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { TrackService } from './../track/track.service';
import { AlbumService } from 'src/album/album.service';
import { CreateUserDto } from './users.dto';

@Injectable({})
export class UsersService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		@InjectModel(Album) private albumRepository: typeof Album,
		private fileService: FileService,
		private trackService: TrackService,
		private albumService: AlbumService
	) {}

	async createUser(username, hash, salt) {
		const newUser = await this.userRepository.create({ username, hash, salt });
		return newUser;
	}

	// async nullUsersDatabase() {
	// 	try {
	// 		const res = this.userRepository.destroy({ truncate: true, cascade: true });
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// 	const userCommon = await this.userRepository.create({ email: 'common', password: 'common' });

	// 	const albumLiked = await this.albumRepository.create({
	// 		name: 'Liked',
	// 		userId: userCommon.id,
	// 	});

	// 	const albumLiked2 = await this.albumRepository.create({
	// 		name: 'Second ps',
	// 		userId: userCommon.id,
	// 	});

	// 	const albumLiked3 = await this.albumRepository.create({
	// 		name: 'Third ps',
	// 		userId: userCommon.id,
	// 	});

	// 	await this.userRepository.update({ albums: [albumLiked] }, { where: { id: userCommon.id } });
	// 	const user1 = await this.userRepository.findOne({ include: { all: true }, where: { id: userCommon.id } });
	// 	const albumStack1 = [...user1.albums];
	// 	await this.pushInitTracks(user1.albums[0].id, '1');

	// 	await this.userRepository.update({ albums: [...albumStack1, albumLiked2] }, { where: { id: userCommon.id } });
	// 	const user2 = await this.userRepository.findOne({ include: { all: true }, where: { id: userCommon.id } });
	// 	const albumStack2 = [...user2.albums];
	// 	await this.pushInitTracks(user2.albums[1].id, '2');

	// 	await this.userRepository.update({ albums: [...albumStack2, albumLiked3] }, { where: { id: userCommon.id } });
	// 	const user3 = await this.userRepository.findOne({ include: { all: true }, where: { id: userCommon.id } });
	// 	await this.pushInitTracks(user3.albums[2].id, '3');

	// 	return await this.getAllUsers();
	// }

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

				const track = await this.trackService.create(fileInstance.audio[0], albumId);
				await this.albumService.pushTrack(albumId, track);
			});
		});
	}

	async getAllUsers() {
		const users = await this.userRepository.findAll({ include: { all: true } });
		return users;
	}

	async getUserByUsername(username: string) {
		const user = await this.userRepository.findOne({ where: { username }, include: { all: true } });

		return user;
	}
}
