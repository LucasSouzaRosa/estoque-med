import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
  } from 'class-validator';
import { RemedioEntity } from 'src/remedio/remedio.entity';
  
  export class FabricanteDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString({ message: 'O campo razão social deve ser do tipo texto' })
    @IsNotEmpty({ message: 'O razão social não pode ser vazio' })
    razaoSocial: string;

    @IsString({ message: 'O campo CNPJ deve ser do tipo texto' })
    @IsNotEmpty({ message: 'O CNPJ não pode ser vazio' })
    cnpj: string;

    @IsString({ message: 'O campo e-mail deve ser do tipo texto' })
    @IsNotEmpty({ message: 'O e-mail não pode ser vazio' })
    email: string;

    @IsString({ message: 'O campo telefone deve ser do tipo texto' })
    @IsNotEmpty({ message: 'O telefone não pode ser vazio' })
    telefone: string;

    @IsBoolean()
    ativo: boolean;

    @IsBoolean()
    licencaativa: boolean;

    remedios?: RemedioEntity[];

  }