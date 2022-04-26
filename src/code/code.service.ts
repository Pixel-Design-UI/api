import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Code } from './code.entity';

@Injectable()
export class CodeService {

    constructor(
        @InjectRepository(Code)
        private codeRepository: Repository<Code>,
        private mailerService: MailerService)
    { }

    /**
     * Check if code already exist, creates one, save it 
     * in the database and send the code to the user
     * @param id Id of the user
     * @param type Type of generated code
     * @param email Email of the user
     */
    public async createNewCode(id: string, type: string, email: string): Promise<void> {
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
        if (!savedCode) throw new BadRequestException('An error has occured while saving the code');

        //Send an email to the user
        this.mailerService.sendMail({
            to: email,
            from: 'yo12345678910112@gmail.com',
            subject: 'Reset code',
            text: ' ',
            html: 'Here is your reset code :' + newCode.code,
        }).then();
    }

    /**
     * Check the given code and check if it still exist
     * @param code The code generated
     * @param userId Id of the user
     * @returns A boolean if the code is valid or not
     */
    public async checkValidCode(code: number, userId: string): Promise<Code> {
        return await this.codeRepository.findOne({ where: { code: code, userId: userId } });
    }

    /**
     * Delete the code passed in parameter
     * @param code The code generated
     * @param userId Id of the user
     * @returns The code deleted
     */
    public async deleteCode(code: number, userId: string): Promise<void> {
        const findCode = await this.codeRepository.findOne({ where: { code: code, userId: userId } });
        await this.codeRepository.remove(findCode);
    }
}
