import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
// import { Role } from 'src/roles/roles.model';
// import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
// import { UserAlbums } from 'src/user-albums/user-albums.model';
import { Album } from 'src/album/album.model';
import { FileModule } from 'src/file/file.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [
		SequelizeModule.forFeature([
			User,
			Album,
			//  UserAlbums
		]),
		RolesModule,
		FileModule,
		TrackModule,
		AlbumModule,
		forwardRef(() => AuthModule),
	],
	exports: [UsersService],
})
export class UsersModule {}
