import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { AskResetDto, CheckCodeDto, SetNewPwdDto } from './dto/reset-pwd.dto';
import { CodeService } from '../code/code.service';
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private codeService: CodeService)
  { }

  /**
   * Create a new user
   * @param data The data recieved
   * @returns Id of the created user
   */
  public async create(data: CreateUserDto): Promise<object> {
    const findEmail = await this.userRepository.findOne({ where: { email: data.email } });
    if (findEmail) throw new ConflictException('Email already exist');

    const findUsername = await this.userRepository.findOne({ where: { username: data.username } });
    if (findUsername) throw new ConflictException('Username already exist');

    data.password = await bcrypt.hash(data.password, 10);

    const newUser = {
      email: data.email,
      username: data.username,
      password: data.password
    }
    const savedUser = await this.userRepository.save(newUser);
    savedUser.password = undefined;

    //Send EMAIL to say the account has been created

    return { id: savedUser.id };
  }

  /**
   * Remove a selected user
   * @param idLink The id of the user
   * @returns A message if the user is deleted
   */
  public async remove(idUser: string): Promise<object> {
    const user = await this.userRepository.findOne(idUser);

    if (!user) throw new NotFoundException('User with that ID does not exist');
    await this.userRepository.remove(user);

    return { message: "User successfully deleted!"}
  }

  /**
   * Login the user
   * @param data The data recieved
   * @returns The user and jwt token
   */
  public async login(data: LoginDto): Promise<object> {
    const user = await this.userRepository.findOne({ where: { email: data.email } });

    if (!user || !(await bcrypt.compare(data.password, user.password))) throw new BadRequestException('Email or password incorrect');

    const token = this.jwtService.sign({ id: user.id });

    return { user: user, token: token }
  }

  /**
   * Create a new code
   * @param data The data recieved
   * @returns A message if the code is created
   */
  public async askResetPwd(data: AskResetDto): Promise<object> {
    const user = await this.userRepository.findOne({ where: { email: data.email } });
    if (!user) throw new NotFoundException('User with that email does not exist');

    this.codeService.create(user, 'reset-code', user.email)

    return { message: "Code successfully created !" }
  }

  /**
   * Check if the code is valid or not
   * @param data The data recieved
   * @returns A message if the code exists
   */
  public async checkCodePwd(data: CheckCodeDto): Promise<object> {
    const user = await this.userRepository.findOne({ where: { email: data.email } });
    if (!user) throw new NotFoundException('User with that email does not exist');

    const codeExist = await this.codeService.checkValidCode(data.code, user.id, 'reset-code')
    if (!codeExist) throw new ConflictException('Code not valid');

    return { message: "Code exists !" }
  }

  /**
   * Set the new password for the user
   * @param data The data recieved
   * @returns A message if the password is changed
   */
  public async setNewPwd(data: SetNewPwdDto): Promise<object> {
    const user = await this.userRepository.findOne({ where: { email: data.email } });
    if (!user) throw new NotFoundException('User with that email does not exist');

    const codeExist = await this.codeService.checkValidCode(data.code, user.id, 'reset-code')
    if (!codeExist) throw new ConflictException('Code not valid');

    user.password = await bcrypt.hash(data.newPassword, 10);
    await this.userRepository.save(user);

    this.codeService.remove(data.code, user.id, 'reset-code');

    //Send EMAIL to say the password has been changed

    return { message: "Password changed !" }
  }
}