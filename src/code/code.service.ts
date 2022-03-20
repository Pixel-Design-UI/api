import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Code } from './code.entity';

@Injectable()
export class CodeService {

    constructor(@InjectRepository(Code) private codeRepository: Repository<Code>, private mailerService: MailerService) { }

    // ----------------------------------------------------------------------------
    //  DELETE OLD CODES + CREATE NEW CODE + SEND EMAIL
    // ----------------------------------------------------------------------------

    public async createNewCode(id: string, type: string, email: string) {
        //Check if codes already exist & delete them
        await getConnection().createQueryBuilder().delete().from(Code)
            .where("userId = :userId", { userId: id })
            .andWhere("type = :type", { type: type })
            .execute();

        //Create a new code & save it
        const newCode = {
            userId: id,
            code: Math.floor(10000 + Math.random() * 90000),
            type: type
        }
        const savedCode = await this.codeRepository.save(newCode);

        //Send an email to the user
        this.mailerService.sendMail({
            to: email,
            from: 'yo12345678910112@gmail.com',
            subject: 'Reset code',
            text: ' ',
            html: 'Here is your reset code :' + newCode.code,
        }).then(() => { }).catch(() => { });
    }

    // ----------------------------------------------------------------------------
    //  CHECK IF THE CODE IS VALID AND EXISTS
    // ----------------------------------------------------------------------------

    public async checkValidCode(code: number, userId: string) {
        const findCode = await this.codeRepository.findOne({ where: { code: code, userId: userId } });
        return findCode;
    }

    // ----------------------------------------------------------------------------
    //  DELETE CODE
    // ----------------------------------------------------------------------------

    public async deleteCode(code: number, userId: string) {
        const findCode = await this.codeRepository.findOne({ where: { code: code, userId: userId } });
        await this.codeRepository.remove(findCode);
        return findCode;
    }
}
