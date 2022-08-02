import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './create-account.dto';

@Injectable()
export class AccountService {
    constructor(@InjectRepository(Account) private accontRepository: Repository<Account>) {

    }

    async insertAccount(createAccountDto: CreateAccountDto) {
        const {
            name,
            creationTime,
            level,
            updationTime
        } = createAccountDto;

        try {
            const existingAccount = await this.accontRepository.findOne({
                where: {
                    name,
                },
            });
            if (existingAccount) {
                throw new ConflictException('Account name is already exist');
            }
            const account = this.accontRepository.create({
                name,
                level,
                updationTime,
                creationTime
            });
            console.log(account);
            await this.accontRepository.save(account);
        }
        catch (e) {
            console.log(e);
            if (e.status === 409) {
                throw new ConflictException(e.response.message);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

}
