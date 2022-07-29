import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    UserModule
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}