import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CodeModule } from 'src/code/code.module';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

require('dotenv').config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    }),
    TypeOrmModule.forFeature([User]),
    CodeModule
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy]
})
export class UserModule { }