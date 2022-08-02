import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './create-account.dto';

@Controller('account')
export class AccountController {
    constructor(private readonly accontService: AccountService) {

    }

    @Post()
    createAccount(@Body() createAccountDto: CreateAccountDto) {
       return this.accontService.insertAccount(createAccountDto)
    }

}
