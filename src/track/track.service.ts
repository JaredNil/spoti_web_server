import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './track.model';
import { InjectModel } from '@nestjs/sequelize';
import { FileService, FileType } from 'src/file/file.service';

@Injectable({})
export class TrackService {
	constructor(
		@InjectModel(Track) private trackRepository: typeof Track,
		private fileService: FileService
	) {}

	async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
		const autoPath = this.fileService.createFile(FileType.AUDIO, audio);
		const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
		const track = await this.trackRepository.create({
			...dto, 
			audio: autoPath,
			picture: picturePath,
		});
		return track;
	}

	async getAll(count = 20, offset = 0): Promise<Track[]> {
		const tracks = await this.trackRepository.findAll();
		// .skip(Number(offset)).limit(Number(count)); 20 из всего, чекнуть sequelize lib
		return tracks;
	}

	async getOne(name: string) {
		const track = await this.trackRepository.findOne({ where: { name }, include: { all: true } });
		return track;
	}

	// async delete(id: string) {
	// 	const track = await this.trackRepository.(id);
	// 	return track;
	// }
}
