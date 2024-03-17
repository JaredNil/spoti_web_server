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
import { AuthService } from 'src/auth/auth.service';

@Injectable({})
export class UsersService {
	constructor(
		@InjectModel(User) private userRepository: typeof User,
		private trackService: TrackService,
		private albumService: AlbumService
	) {}

	async createUser(username, hash, salt) {
		const newUser = await this.userRepository.create({ username, hash, salt });
		return newUser;
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
