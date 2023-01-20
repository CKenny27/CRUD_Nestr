import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString } from "class-validator";

export class UpdateAlumnoDto {
    @IsString()
    nombre: string;
    @IsString()
    curso: string;
    @IsNumber()
    @Type(()=>Number)
    @IsPositive()
    nota1: number;
    @IsNumber()
    @Type(()=>Number)
    @IsPositive()
    nota2: number;
}