import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './track.model';
import { InjectModel } from '@nestjs/sequelize';
import { FileService, FileType } from 'src/file/file.service';
import * as mm from 'music-metadata';

@Injectable({})
export class TrackService {
	constructor(
		@InjectModel(Track) private trackRepository: typeof Track,
		private fileService: FileService
	) {}

	async create(audio): Promise<Track> {
		// console.log(audio);

		const metadata = await mm.parseBuffer(audio.buffer);
		const { genre, artist, picture, title } = metadata.common;

		// console.log(picture[0]);

		const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
		const picturePath = this.fileService.createCover(FileType.IMAGE, picture[0]);

		const track = await this.trackRepository.create({
			name: title,
			artist: artist,
			audio: audioPath,
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

	async deleteAll() {
		const track = await this.trackRepository.destroy({
			where: {},
			truncate: true,
		});
		this.fileService.removeAllFile();
		return track;
	}

	// async delete(id: string) {
	// 	const track = await this.trackRepository.(id);
	// 	return track;
	// }
}
