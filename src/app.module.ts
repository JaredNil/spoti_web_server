import { Module } from '@nestjs/common';
// import { TrackModule } from './track/track.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { AuthModule } from './auth/auth.module';
import { AlbumModule } from './album/album.module';
import { Album } from './album/album.model';
// import { UserAlbums } from './user-albums/user-albums.model';
import { TrackModule } from './track/track.module';
import { Track } from './track/track.model';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		}),

		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		UsersModule,
		AuthModule,
		TrackModule,
		AlbumModule,
		FileModule,
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [User, Track, Album],
			autoLoadModels: true,
		}),
		SequelizeModule.forFeature([User, Album]),
	],
})
export class AppModule {}
