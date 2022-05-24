import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AskResetDto, CheckCodeDto, SetNewPwdDto } from './dto/reset-pwd.dto';
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