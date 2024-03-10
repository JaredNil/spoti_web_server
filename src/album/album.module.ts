import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from '../file/file.module';
import { Album } from './album.model';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
	controllers: [AlbumController],
	imports: [SequelizeModule.forFeature([Album]), FileModule],
	providers: [AlbumService],
})
export class AlbumModule {}
