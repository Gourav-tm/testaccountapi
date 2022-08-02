import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateAccountDto {
    id: string;

    @IsString()
    @MinLength(1)
    @MaxLength(200)
    @IsNotEmpty()
    name: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    @Max(1000)
    level: number;


    creationTime: Date;

    updationTime: Date;

    createdBy: string;

    updatedBy: string;

}