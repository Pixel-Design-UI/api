import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })  
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
