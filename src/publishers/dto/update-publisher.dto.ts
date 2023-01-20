//import { PartialType } from '@nestjs/mapped-types';
//import { CreatePublisherDto } from './create-publisher.dto';

import { IsString, MinLength } from "class-validator";

//export class UpdatePublisherDto extends PartialType(CreatePublisherDto) {}

export class UpdatePublisherDto{
    @IsString()
    @MinLength(1)
    name: string;
}
