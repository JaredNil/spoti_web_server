import { Injectable } from '@nestjs/common';
import { Album } from './album.model';
import { InjectModel } from '@nestjs/sequelize';
import { FileService, FileType } from 'src/file/file.service';
import * as mm from 'music-metadata';
import * as uuid from 'uuid';
import { CreateAlbumDto, PushTrackDto } from './dto/create-album.dto';
import { Track } from 'src/track/track.model';

@Injectable({})
export class AlbumService {
	constructor(
		@InjectModel(Album) private albumRepository: typeof Album
		// private fileService: FileService
	) {}

	async createAlbum(dto: CreateAlbumDto) {
		const album = await this.albumRepository.create({ ...dto });
		return album.dataValues;
	}

	async pushTrack(albumId, track: Track) {
		const album = await this.getAlbumById(albumId);
		album.tracks = [...album.tracks, track];
		// const res = await this.albumRepository.update({ tracks: [...album.tracks, track] }, { where: { id: albumId } });
		await album.save();
	}

	async getAlbumById(id: number) {
		const album = await this.albumRepository.findOne({ where: { id }, include: { all: true } });
		return album;
	}

	async getAlbumsAll() {
		const album = await this.albumRepository.findAll({ include: { all: true } });
		return album;
	}
}
