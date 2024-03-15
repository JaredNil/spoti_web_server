import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from './track.model';
import { FileModule } from './../file/file.module';
import { Album } from 'src/album/album.model';

@Module({
	controllers: [TrackController],
	imports: [SequelizeModule.forFeature([Track, Album]), FileModule],
	providers: [TrackService],
	exports: [TrackService],
})
export class TrackModule {}
