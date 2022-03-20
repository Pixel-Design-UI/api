import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { MailerService } from '@nestjs-modules/mailer';
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>, private jwtService: JwtService, private readonly mailerService: MailerService) { }

  // ----------------------------------------------------------------------------
  //  REGISTER 
  // ---------------------------------------------------------------------------- 

  public async register(data: RegisterDto) {
    //Check if email already exists
    const findEmail = await this.userRepository.findOne({ where: { email: data.email } });
    if (findEmail) throw new ConflictException('Email already exist');

    //Hash the password
    data.password = await bcrypt.hash(data.password, 10);

    //Create a new user & save it
    const newUser = {
      email: data.email,
      fullName: data.fullName,
      password: data.password
    }
    const savedUser = await this.userRepository.save(newUser);
    savedUser.password = undefined;

    //Send an email
    this.mailerService.sendMail({
      to: data.email,
      from: 'yo12345678910112@gmail.com',
      subject: 'Welcome on BuyFair',
      text: ' ',
      html: 'Your account has been succesfully created.',
    }).then(() => { }).catch(() => { });

    return savedUser.id;
  }

  // ----------------------------------------------------------------------------
  //  LOGIN 
  // ---------------------------------------------------------------------------- 

  public async login(data: LoginDto) {
    //Check if an user with that email exist
    const findUser = await this.userRepository.findOne({ where: { email: data.email } });

    //Check if password is the same
    if (!findUser || !(await bcrypt.compare(data.password, findUser.password))) throw new BadRequestException('Email or password incorrect');

    //Create and assign token
    const token = this.jwtService.sign({ id: findUser.id });

    return { user: findUser, token: token }
  }
}