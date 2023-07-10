import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../app/PrismaService/PrismaService';
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async validateUser(credentials: { email: string; password: string }) {
    console.log(credentials);
    const user = await this.prisma.user.findFirst({
      where: {
        email: credentials.email,
      },
    });

    if (user && user.password === credentials.password) {
      const { password, ...rest } = user;
      return this.login(rest);
    }

    return { message: 'Email or password incorrect', status: 'fail' };
  }
  async login(user: any) {
    const payload = {
      email: user.email,
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: 'secret',
        expiresIn: '12h',
      }),
    };
  }
}
