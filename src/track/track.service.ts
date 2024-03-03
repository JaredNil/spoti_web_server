import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/track.schems';
import { Model, ObjectId } from 'mongoose';
import { CreateTrackDto } from './dto/create-track.dto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable({})
export class TrackService {
	constructor(
		@InjectModel(Track.name) private trackModel: Model<TrackDocument>,
		private fileService: FileService
	) {}

	async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
		const autoPath = this.fileService.createFile(FileType.AUDIO, audio);
		const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
		const track = await this.trackModel.create({ ...dto, audio: autoPath, picture: picturePath });
		return track;
	}

	async getAll(count = 20, offset = 0): Promise<Track[]> {
		const tracks = await this.trackModel.find().skip(Number(offset)).limit(Number(count));
		return tracks;
	}

	async getOne(id: ObjectId) {
		const track = await this.trackModel.find(id);
		return track;
	}

	async delete(id: ObjectId) {
		const track = await this.trackModel.findByIdAndDelete(id);
		return track;
	}
}
