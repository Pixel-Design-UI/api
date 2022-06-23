import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
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
     * Find all codes
     * @returns A list of all codes
     */
    public async findAll(): Promise<Code[]> {
        const codes = await this.codeRepository.find();
        if (!codes) throw new NotFoundException('No codes found');
        return codes;
    }

    /**
     * Find one code based on the id
     * @param id The id of the code
     * @returns The code with this id
     */
    public async findOne(id: string): Promise<Code> {
        const code = await this.codeRepository.findOne(id);
        if (!code) throw new NotFoundException('Code with that ID does not exist');
        return code;
    }

    /**
     * Check if code already exist, creates one, save it 
     * in the database and send the code to the user
     * @param id Id of the user
     * @param type Type of generated code
     * @param email Email of the user
     */
    public async create(user: User, type: string, email: string): Promise<void> {
        await getConnection().createQueryBuilder().delete().from(Code)
            .where("userId = :userId", { userId: user.id })
            .andWhere("type = :type", { type: type })
            .execute();
        
        const newCode = {
            userId: user,
            code: Math.floor(10000 + Math.random() * 90000),
            type: type
        }
        const savedCode = await this.codeRepository.save(newCode);
        if (!savedCode) throw new BadRequestException('An error has occured while saving the code');

        //Send EMAIL newCode.code to user
    }

    /**
     * Delete the code passed in parameter
     * @param code The code generated
     * @param userId Id of the user
     * @returns The code deleted
     */
    public async remove(code: number, userId: string, type: string): Promise<void> {
        const findCode = await this.codeRepository.findOne({ where: { code: code, userId: userId, type: type } });
        if (!findCode) throw new NotFoundException('Code does not exist');
        await this.codeRepository.remove(findCode);
    }    
    
    /**
    * Check the given code and check if it still exist
    * @param code The code generated
    * @param userId Id of the user
    * @returns A boolean if the code is valid or not
    */
    public async checkValidCode(code: number, userId: string, type: string): Promise<Code> {
        return await this.codeRepository.findOne({ where: { code: code, userId: userId, type: type } });
    }
}
