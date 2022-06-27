import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Link]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })  ],
  controllers: [LinkController],
  exports: [LinkService],
  providers: [LinkService]
})
export class LinkModule {}
