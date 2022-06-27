import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createLinkDto: CreateLinkDto, @Req() req) {
    return this.linkService.create(createLinkDto, req.user);
  }

  @Get(':userId')
  findAllForUser(@Param('userId') userId: string) {
    return this.linkService.findAllForUser(userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto, @Req() req) {
    return this.linkService.update(id, updateLinkDto, req.user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string, @Req() req) {
    return this.linkService.remove(id, req.user);
  }
}
