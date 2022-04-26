import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dto/register.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { AskResetDto, CheckCodeDto, SetNewPwdDto } from './dto/reset-pwd.dto';
import { CodeService } from '../code/code.service';
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
    private codeService: CodeService)
  { }

  /**
   * Create a new user
   * @param data The data recieved
   * @returns Id of the created user
   */
  public async register(data: RegisterDto): Promise<string> {
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
    }).then();

    return savedUser.id;
  }

  /**
   * Login the user
   * @param data The data recieved
   * @returns The user and jwt token
   */
  public async login(data: LoginDto): Promise<object> {
    //Check if an user with that email exist
    const user = await this.userRepository.findOne({ where: { email: data.email } });

    //Check if password is the same
    if (!user || !(await bcrypt.compare(data.password, user.password))) throw new BadRequestException('Email or password incorrect');

    //Create and assign token
    const token = this.jwtService.sign({ id: user.id });

    return { user: user, token: token }
  }

  /**
   * Create a new code
   * @param data The data recieved
   * @returns A message if the code is created
   */
  public async askResetPwd(data: AskResetDto): Promise<object> {
    //Check if an user with that email exist
    const user = await this.userRepository.findOne({ where: { email: data.email } });
    if (!user) throw new ConflictException('User with that email does not exist');

    //Delete and create new code & send an email
    this.codeService.createNewCode(user.id, 'reset-code', user.email)

    return { message: "Code successfully created !" }
  }

  /**
   * Check if the code is valid or not
   * @param data The data recieved
   * @returns A message if the code exists
   */
  public async checkCodePwd(data: CheckCodeDto): Promise<object> {
    //Check if an user with that email exist
    const user = await this.userRepository.findOne({ where: { email: data.email } });
    if (!user) throw new ConflictException('User with that email does not exist');

    //Check if the code is valid or not
    const codeExist = await this.codeService.checkValidCode(data.code, user.id)
    if (!codeExist) throw new ConflictException('Code not valid');

    return { message: "Code exists !" }
  }

  /**
   * Set the new password for the user
   * @param data The data recieved
   * @returns A message if the password is changed
   */
  public async setNewPwd(data: SetNewPwdDto): Promise<object> {
    //Check if an user with that email exist
    const user = await this.userRepository.findOne({ where: { email: data.email } });
    if (!user) throw new ConflictException('User with that email does not exist');

    //Check if the code is valid or not
    const codeExist = await this.codeService.checkValidCode(data.code, user.id)
    if (!codeExist) throw new ConflictException('Code not valid');

    //Hash the password & save user
    user.password = await bcrypt.hash(data.newPassword, 10);
    await this.userRepository.save(user);

    this.codeService.deleteCode(data.code, user.id);

    //Send an email
    this.mailerService.sendMail({
      to: data.email,
      from: 'yo12345678910112@gmail.com',
      subject: 'Password reseted',
      text: ' ',
      html: 'Your password has been changed.',
    }).then(() => { }).catch(() => { });

    return { message: "Password changed !" }
  }
}