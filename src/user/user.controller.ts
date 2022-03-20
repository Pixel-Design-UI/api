import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPwd1Dto, ResetPwd2Dto, ResetPwd3Dto } from './dto/reset-pwd.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.userService.register(data);
  }

  @Post('login')
  login(@Body() data: LoginDto) {
    return this.userService.login(data);
  }

  @Post('reset-pwd-1')
  resetpwd1(@Body() data: ResetPwd1Dto) {
    return this.userService.resetpwd1(data);
  }

  @Post('reset-pwd-2')
  resetpwd2(@Body() data: ResetPwd2Dto) {
    return this.userService.resetpwd2(data);
  }

  @Post('reset-pwd-3')
  resetpwd3(@Body() data: ResetPwd3Dto) {
    return this.userService.resetpwd3(data);
  }
}
