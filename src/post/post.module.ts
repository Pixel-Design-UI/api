import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    UserModule  
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
