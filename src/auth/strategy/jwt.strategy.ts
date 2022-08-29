import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { request } from 'http';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class Jwtstrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'super-secret-code',
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
