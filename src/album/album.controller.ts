import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AlbumService } from './album.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('/album')
export class AlbumController {
	constructor(private albumService: AlbumService) {}

	@Get(':id')
	getAlbumById(@Param('id') id: number) {
		return this.albumService.getAlbumById(id);
	}

	@Get()
	getAllAlbum() {
		return this.albumService.getAlbumsAll();
	}
	@Post()
	// @UseInterceptors(FileFieldsInterceptor([{ name: 'audio', maxCount: 1 }]))
	create(@Body() dto: CreateAlbumDto) {
		return this.albumService.createAlbum(dto);
	}

	// @Post()
	// @UseInterceptors(FileFieldsInterceptor([{ name: 'audio', maxCount: 1 }]))
	// create(@UploadedFiles() files) {
	// 	console.log(files);
	// 	return this.albumService.create(files.audio[0]);
	// }

	// @Get()
	// getAll(@Query('count') count: number, @Query('offset') offset: number) {
	// 	return this.albumService.getAll(count, offset);
	// }

	// @Delete()
	// deleteAll() {
	// 	return this.albumService.deleteAll();
	// }

	// @Delete(':id')
	// delete(@Param('id') id: string) {
	// 	return this.trackService.delete(id);
	// }
}
