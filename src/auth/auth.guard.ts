import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CookieService } from './cookie.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private jwtService: JwtService) {}

	canActivate(context: ExecutionContext) {
		const req = context.switchToHttp().getRequest() as Request;
		console.log(req.cookies);
		const token = req.cookies[CookieService.tokenKey];

		if (!token) {
			throw new UnauthorizedException();
		}

		try {
			const sessionInfo = this.jwtService.verifyAsync(token, {
				secret: 'SECRET',
			});
			req['session'] = sessionInfo;
			return true;
		} catch {
			throw new UnauthorizedException();
		}
	}
}
