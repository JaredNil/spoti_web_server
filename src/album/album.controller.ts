import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AlbumService } from './album.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/album')
export class AlbumController {
	constructor(private albumService: AlbumService) {}

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

	// @Get(':id')
	// getOne(@Param('id') id: string) {
	// 	return this.albumService.getOne(id);
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
