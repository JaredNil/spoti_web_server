import { Injectable } from '@nestjs/common';
import { User } from './users/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { Album } from './album/album.model';

@Injectable()
export class AppService {
	constructor(
		@InjectModel(Album) private albumRepository: typeof Album,
		@InjectModel(User) private userRepository: typeof User,
		private authService: AuthService,
		private usersService: UsersService
	) {}
	async nullUsersDatabase() {
		try {
			const res = this.userRepository.destroy({ truncate: true, cascade: true });
		} catch (error) {
			console.log(error);
		}
		await this.authService.signUp({ username: 'common', password: 'common' });
		const userCommon = await this.usersService.getUserByUsername('common');

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
		const albumStack1 = [...user1.albums];
		await this.usersService.pushInitTracks(user1.albums[0].id, '1');

		await this.userRepository.update({ albums: [...albumStack1, albumLiked2] }, { where: { id: userCommon.id } });
		const user2 = await this.userRepository.findOne({ include: { all: true }, where: { id: userCommon.id } });
		const albumStack2 = [...user2.albums];
		await this.usersService.pushInitTracks(user2.albums[1].id, '2');

		await this.userRepository.update({ albums: [...albumStack2, albumLiked3] }, { where: { id: userCommon.id } });
		const user3 = await this.userRepository.findOne({ include: { all: true }, where: { id: userCommon.id } });
		await this.usersService.pushInitTracks(user3.albums[2].id, '3');

		return await this.usersService.getAllUsers();
	}
}
