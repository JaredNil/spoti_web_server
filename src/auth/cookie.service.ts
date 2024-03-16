import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
	static tokenKey = 'access-token';

	async setToken(res: Response, token: string) {
		res.cookie(CookieService.tokenKey, token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
	}

	async removeToken(res: Response) {
		res.clearCookie(CookieService.tokenKey);
	}
}
