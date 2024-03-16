import { Injectable } from '@nestjs/common';
import { randomBytes, pbkdf2Sync } from 'crypto';

@Injectable()
export class PasswordService {
	constructor() {} // private jwtService: JwtService // private passwordService: PasswordService, // private userService: UsersService,

	async getSalt() {
		return randomBytes(16).toString('hex');
	}
	async getHash(password: string, salt: string) {
		return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
	}
}
