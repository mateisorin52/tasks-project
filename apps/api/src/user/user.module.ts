import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../app/PrismaService/PrismaService';

@Module({
  providers: [UserResolver, UserService, PrismaService],
})
export class UserModule {}
