import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Track } from 'src/track/track.model';
import { Album } from './album.model';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable({})
export class AlbumService {
	constructor(@InjectModel(Album) private albumRepository: typeof Album) {}

	async createAlbum(dto: CreateAlbumDto) {
		const album = await this.albumRepository.create({ ...dto });
		return album.dataValues;
	}

	async pushTrack(albumId, track: Track) {
		// const album = await this.getAlbumById(albumId);
		// album.tracks = [...album.tracks, track];
		// const res = await this.albumRepository.update({ tracks: [...album.tracks, track] }, { where: { id: albumId } });
		// await album.save();
	}

	async getAlbumById(id: number) {
		const album = await this.albumRepository.findOne({ where: { id }, include: { all: true } });
		const formatAlbum = {
			id: album.id,
			user_id: album.author.id,
			author: album.author.username,
			title: album.name,
			imagePath: album.picture,
		};
		return formatAlbum;
	}

	async getAlbumsAll() {
		const albums = await this.albumRepository.findAll({ include: { all: true } });
		const newAlbums = albums.map((al) => {
			return {
				id: al.id,
				user_id: al.author.id,
				author: al.author.username,
				title: al.name,
				imagePath: al.picture,
			};
		});
		return newAlbums;
	}
}
