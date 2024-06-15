import {
    IsDateString, 
    IsEnum, 
    IsNotEmpty, 
    IsOptional,
    IsString,
    IsUUID,
    IsNumber,
    IsBoolean,
    IsArray,
    ArrayNotEmpty,
    ValidateNested,
  } from 'class-validator';
  import { TipoEnum } from './tipo.enum';
import { Type } from 'class-transformer';
import { FabricanteDto } from 'src/fabricante/fabricante.dto';
  
  export class RemedioDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString({ message: 'O campo nome deve ser do tipo texto' })
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    @IsString({ message: 'O campo descricao deve ser do tipo texto' })
    @IsOptional()
    descricao: string;

    @IsDateString()
    @IsOptional()
    dataValidade: Date;

    @IsEnum(TipoEnum, { message: 'O tipo deve ser apenas G ou O.' })
    @IsOptional()
    tipo: TipoEnum;

    @IsNumber()
    @IsNotEmpty({ message: 'O saldo não pode ser vazio' })
    saldo: number;

    @IsBoolean()
    controlado: boolean;

    @IsUUID()
    fabricanteId: string;
  }