import { Controller, Post, Body, Get, Patch, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { AskResetDto, CheckCodeDto, SetNewPwdDto } from './dto/reset-pwd.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard())
  remove(@Req() req) {
    return this.userService.remove(req.user.id);
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.userService.login(data);
  }

  @Post('ask-reset-pwd')
  askResetPwd(@Body() data: AskResetDto) {
    return this.userService.askResetPwd(data);
  }

  @Post('check-code-pwd')
  checkCodePwd(@Body() data: CheckCodeDto) {
    return this.userService.checkCodePwd(data);
  }

  @Post('set-new-pwd')
  setNewPwd(@Body() data: SetNewPwdDto) {
    return this.userService.setNewPwd(data);
  }
}