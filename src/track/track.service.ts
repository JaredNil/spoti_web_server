import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './track.model';
import { InjectModel } from '@nestjs/sequelize';
import { FileService, FileType } from 'src/file/file.service';
import * as mm from 'music-metadata';
import * as uuid from 'uuid';
import { AlbumService } from 'src/album/album.service';

const defaultCover = [
	{
		format: 'image/jpeg',
		type: 'Cover (front)',
		description: 'Untitled',
		data: '32',
	},
];

@Injectable({})
export class TrackService {
	constructor(
		@InjectModel(Track) private trackRepository: typeof Track,
		private fileService: FileService
	) {}

	async create(audio, albumId): Promise<Track> {
		// console.log(audio);

		const metadata = await mm.parseBuffer(audio.buffer);
		const { genre, artist, picture, title } = metadata.common;

		const idTrack = title + uuid.v4();
		const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
		const picturePath = picture ? this.fileService.createCover(FileType.IMAGE, picture[0]) : undefined;

		const track = await this.trackRepository.create({
			name: idTrack,
			artist: artist,
			albumId: albumId,
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
