import { Controller, Get, Param } from '@nestjs/common';
import { State } from './state.entity';
import { StateService } from './state.service';

@Controller('state')
export class StateController {
    constructor(private readonly stateService: StateService) {

    }

    @Get("/:countryId")
    getAll(@Param('countryId') countryId:number): Promise<State[]> {
        return this.stateService.findAll(countryId);
    }

}
