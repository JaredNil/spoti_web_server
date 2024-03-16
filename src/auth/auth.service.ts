import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import { GetSessionDto, SessionDto, SignDto } from './auth.dto';
import { PasswordService } from './password.service';
import { User } from 'src/users/users.model';
import { Session } from 'inspector';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private passwordService: PasswordService,
		private jwtService: JwtService
	) {}

	async generateToken(user: User) {
		const payload = { id: user.id, username: user.username };
		return {
			token: this.jwtService.sign(payload),
		};
	}

	async signUp(signDto: SignDto) {
		const user = await this.userService.getUserByUsername(signDto.username);

		if (user) {
			throw new BadRequestException({ type: 'user-intance exist' });
		}

		const salt = await this.passwordService.getSalt();
		const hash = await this.passwordService.getHash(signDto.password, salt);

		const newUser = await this.userService.createUser(signDto.username, hash, salt);

		const { token } = await this.generateToken(newUser);

		const { username } = newUser;

		return { token, username };
	}
	async signIn(signDto: SignDto) {
		const user = await this.userService.getUserByUsername(signDto.username);

		if (!user) {
			throw new UnauthorizedException();
		}

		const hash = await this.passwordService.getHash(signDto.password, user.salt);

		if (hash !== user.hash) {
			throw new UnauthorizedException();
		}

		const { token } = await this.generateToken(user);
		const { username } = user;

		return { token, username };
	}

	async getSessionInfo(token: GetSessionDto) {
		console.log(token.token);
		const sessionInfo = await this.jwtService.verifyAsync<SessionDto>(token.token, {
			secret: 'SECRET',
		});

		const user = await this.userService.getUserByUsername(sessionInfo.username);

		const accessToken = await this.generateToken(user);
		const { username } = user;

		return { token, username };
	}

	// async login(userDto: CreateUserDto) {
	// 	const user = await this.validateUser(userDto);
	// 	return this.generateToken(user);
	// }

	// async registration(userDto: CreateUserDto) {
	// 	const candidate = await this.userService.getUserByUsername(userDto.username);
	// 	if (candidate) {
	// 		console.log('Авторизация');
	// 		// throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST);
	// 		const user = await this.validateUser(userDto);
	// 		return this.generateToken(user);
	// 	} else {
	// 		console.log('Регистрация');
	// 		const hashPassword = await bcrypt.hash(userDto.password, 5);
	// 		const user = await this.userService.createUser({ ...userDto, password: hashPassword });

	// 		return this.generateToken(user);
	// 	}
	// }

	// async validateUser(userDto: CreateUserDto) {
	// 	const user = await this.userService.getUserByEmail(userDto.email);

	// 	// const passwordEquals = await bcrypt.compare(userDto.password, user.password);

	// 	if (user && passwordEquals) {
	// 		return user;
	// 	} else throw new UnauthorizedException({ message: 'Некорретный email или пароль' });
	// }
}
