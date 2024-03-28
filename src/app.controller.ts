import { Controller, Delete, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { AlbumService } from './album/album.service';
import { UsersService } from './users/users.service';

@Controller('app')
export class AppController {
	constructor(
		private appService: AppService,
		private usersService: UsersService,
		private albumService: AlbumService
	) {}

	@Get()
	async getCommonAlbum() {
		const commonUser = await this.usersService.getUserByName('common');
		const commonLikedAlbumId = commonUser.albums[0].id;
		const commonAlbum = await this.albumService.getAlbumById(commonLikedAlbumId);
		return [commonAlbum];
	}

	@ApiOperation({ summary: 'Удалить всю базу данных' })
	@Delete()
	nullUsersDatabase() {
		return this.appService.nullUsersDatabase();
	}
}
