import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileModule } from '../file/file.module';
import { Album } from './album.model';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
// import { UserAlbums } from 'src/user-albums/user-albums.model';
import { User } from 'src/users/users.model';

@Module({
	controllers: [AlbumController],
	imports: [SequelizeModule.forFeature([User, Album]), FileModule],
	providers: [AlbumService],
})
export class AlbumModule {}
