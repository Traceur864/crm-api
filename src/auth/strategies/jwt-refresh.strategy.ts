import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: process.env.JWT_REFRESH_SECRET ?? 'refresh_secret',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: { sub: number; email: string }) {
    const refreshToken = req.body.refreshToken;
    return { id: payload.sub, email: payload.email, refreshToken };
  }
}
