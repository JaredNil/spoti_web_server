import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		// ServeStaticModule.forRoot({
		// 	rootPath: path.resolve(__dirname, 'static'),
		// }),
		// MongooseModule.forRoot('mongodb+srv://jaredbozh:3g1k0AFBH88tHiHV@spcluster.zmszjbb.mongodb.net/?retryWrites=true'),
		// TrackModule,
		// FileModule,
		ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
		UsersModule,
		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [],
			// autoLoadModels: true,
		}),
	],
})
export class AppModule {}
