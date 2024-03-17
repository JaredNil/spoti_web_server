import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/users.dto';
import { GetSessionDto, SignDto } from './auth.dto';
import { CookieService } from './cookie.service';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './session.decorator';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private cookieService: CookieService
	) {}

	@Post('/signup')
	@ApiCreatedResponse()
	@HttpCode(HttpStatus.OK)
	async signUp(@Body() signDto: SignDto, @Res({ passthrough: true }) res: Response) {
		const { token, username } = await this.authService.signUp(signDto);

		this.cookieService.setToken(res, token);

		return { token, username };
	}

	@Post('/signin')
	@ApiOkResponse()
	async signIn(@Body() signDto: SignDto, @Res({ passthrough: true }) res: Response) {
		const { token, username } = await this.authService.signIn(signDto);

		// this.cookieService.setToken(res, accessToken.token);

		return { token, username };
	}
	@Post('/signout')
	@HttpCode(HttpStatus.OK)
	// @UseGuards(AuthGuard)
	signOut(@Res({ passthrough: true }) res: Response) {
		this.cookieService.removeToken(res);
	}

	// @Post('/session')
	// @ApiOkResponse()
	// async getSessionInfo(@Body() sessionDto: GetSessionDto) {
	// 	return await this.authService.getSessionInfo(sessionDto);
	// }

	@Get('/session')
	@ApiOkResponse({ type: GetSessionDto })
	@UseGuards(AuthGuard)
	getSessionInfo(@SessionInfo() session: GetSessionDto) {
		return session;
	}

	// @Post('/login')
	// login(@Body() userDto: CreateUserDto) {
	// 	// return this.authService.login(userDto);
	// }

	// @Post('/registration')
	// registration(@Body() userDto: CreateUserDto) {
	// 	// return this.authService.registration(userDto);
	// }
}
