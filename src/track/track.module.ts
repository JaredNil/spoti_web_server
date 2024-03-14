import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from './track.model';
import { FileModule } from './../file/file.module';

@Module({
	controllers: [TrackController],
	imports: [SequelizeModule.forFeature([Track]), FileModule],
	providers: [TrackService],
})
export class TrackModule {}
