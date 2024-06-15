import { 
    IsNotEmpty, 
    IsOptional,
    IsString,
    IsUUID,
    IsArray,
    ArrayNotEmpty,
    ValidateNested,
  } from 'class-validator';
import { Type } from 'class-transformer';
import { RemedioDto } from 'src/remedio/remedio.dto';
  
  export class SintomasDto {
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString({ message: 'O campo nome deve ser do tipo texto' })
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    nome: string;

    @IsString({ message: 'O campo descricao deve ser do tipo texto' })
    @IsOptional()
    descricao: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => RemedioDto)
    remedio: RemedioDto[];
  }