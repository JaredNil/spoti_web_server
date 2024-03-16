import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Album } from 'src/album/album.model';
import { FileModule } from 'src/file/file.module';
import { TrackModule } from 'src/track/track.module';
import { AlbumModule } from 'src/album/album.module';
import { JwtModule } from '@nestjs/jwt';
import { PasswordService } from 'src/auth/password.service';

@Module({
	controllers: [UsersController],
	providers: [UsersService],
	imports: [SequelizeModule.forFeature([User, Album]), FileModule, TrackModule, AlbumModule],
	exports: [UsersService],
})
export class UsersModule {}
