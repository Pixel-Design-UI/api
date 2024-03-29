import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.postService.create(createPostDto, req.user);
  }

  @Get(':index')
  findAll(@Param('index') index:number) {
    return this.postService.findAll(index);
  }

  @Get('user/:username')
  findAllForUser(@Param('username') username: string) {
    return this.postService.findAllForUser(username);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req) {
    return this.postService.update(id, updatePostDto, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string, @Req() req) {
    return this.postService.remove(id, req.user);
  }
}
