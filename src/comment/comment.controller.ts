import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    return this.commentService.create(createCommentDto, req.user);
  }

  @Get('post/:postId')
  findAllForPost(@Param('postId') postId: string) {
    return this.commentService.findAllForPost(postId);
  }

  @Get('user/:userId')
  findAllForUser(@Param('userId') userId: string) {
    return this.commentService.findAllForUser(userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @Req() req) {
    return this.commentService.update(id, updateCommentDto, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string, @Req() req) {
    return this.commentService.remove(id, req.user);
  }
}
