import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from '../file/file.module';
import { Album } from './album.model';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { User } from 'src/users/users.model';
import { Track } from 'src/track/track.model';
import { TrackModule } from 'src/track/track.module';

@Module({
	controllers: [AlbumController],
	imports: [SequelizeModule.forFeature([User, Album, Track]), FileModule, TrackModule],
	providers: [AlbumService],
	exports: [AlbumService],
})
export class AlbumModule {}
