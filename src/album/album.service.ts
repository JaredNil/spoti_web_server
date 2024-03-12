import { Injectable } from '@nestjs/common';
import { Album } from './album.model';
import { InjectModel } from '@nestjs/sequelize';
import { FileService, FileType } from 'src/file/file.service';
import * as mm from 'music-metadata';
import * as uuid from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable({})
export class AlbumService {
	constructor(
		@InjectModel(Album) private albumRepository: typeof Album
		// private fileService: FileService
	) {}

	async createAlbum(dto: CreateAlbumDto) {
		const album = await this.albumRepository.create(dto);
		return album;
	}

	async getAlbumById(id: number) {
		const album = await this.albumRepository.findOne({ where: { id } });
		return album;
	}

	async getAlbumsAll() {
		const album = await this.albumRepository.findAll({ where: {} });
		return album;
	}
}
