import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { PasswordService } from './password.service';
import { CookieService } from './cookie.service';

@Module({
	exports: [AuthService],
	providers: [AuthService, PasswordService, CookieService],
	controllers: [AuthController],
	imports: [
		// forwardRef(() => UsersModule),
		UsersModule,
		JwtModule.register({
			global: true,
			secret: process.env.PRIVATE_KEY || 'SECRET',
			signOptions: {
				expiresIn: '24h',
			},
		}),
	],
})
export class AuthModule {}
