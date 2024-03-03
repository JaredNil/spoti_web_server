import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
// import { MongooseModule } from '@nestjs/mongoose';
import { Track, TrackSchema } from './schemas/track.schems';
import { FileService } from 'src/file/file.service';

@Module({
	// imports: [MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema }])],
	controllers: [
		// TrackController
	],
	providers: [
		// TrackService, FileService
	],
})
export class TrackModule {}