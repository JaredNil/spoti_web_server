import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/tracks')
export class TrackController {
	constructor(private trackService: TrackService) {}

	@Post()
	@UseInterceptors(FileFieldsInterceptor([{ name: 'audio', maxCount: 1 }]))
	create(@UploadedFiles() files) {
		return this.trackService.create(files.audio[0]);
	}

	@Get()
	getAll(@Query('count') count: number, @Query('offset') offset: number) {
		return this.trackService.getAll(count, offset);
	}

	@Get(':id')
	getOne(@Param('id') id: string) {
		return this.trackService.getOne(id);
	}

	@Delete()
	deleteAll() {
		return this.trackService.deleteAll();
	}

	// @Delete(':id')
	// delete(@Param('id') id: string) {
	// 	return this.trackService.delete(id);
	// }
}
