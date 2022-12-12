import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import useragent = require('useragent');
import { DeviceIp } from './auth.model';

export const DeviceAndip = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    console.log('wrk');
    const request = ctx.switchToHttp().getRequest();
    const agent = useragent.parse(request.headers['user-agent']);
    const ip =
      (request.headers['x-forwarded-for'] || '').split(',').pop().trim() ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      request.connection.socket.remoteAddress;
    const dIp: DeviceIp = {
      device: agent.device.toString(),
      ip,
    };
    console.log(dIp + 'From: ');
    return dIp;
  },
);
