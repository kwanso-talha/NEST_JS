import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { jwtConstants } from './constants'


@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy) {
	constructor(private userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants,

		});
	}
}