import { BadRequestException, Injectable, NotFoundException, } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RemedioEntity } from './remedio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RemedioDto } from './remedio.dto';
import { TipoEnum } from './tipo.enum';
import { FabricanteEntity } from 'src/fabricante/fabricante.entity';

@Injectable()
export class RemedioService {
    
    constructor(
        @InjectRepository(RemedioEntity)
        private remedioRepository: Repository<RemedioEntity>, 
        @InjectRepository(FabricanteEntity)
        private fabricanteRepository: Repository<FabricanteEntity>,
    ) {}

    findAll() {
        return this.remedioRepository.find({
            relations: { fabricante: true},
        });
    }

    async findById(id: string): Promise<RemedioEntity> {
        const findOne = await this.remedioRepository.findOne({
            where: { id },
            relations: { fabricante: true },
        });
        if (!findOne) {
            throw new NotFoundException('Remédio não encontrado com o id ' + id);
        }
        return findOne;
    }

    async remove(id: string) {
        const findById = await this.findById(id);
        await this.remedioRepository.remove(findById);
        return { ...findById, id };
    }

    async create(dto: RemedioDto) {
        const fabricante = await this.fabricanteRepository.findOne({
            where: { id: dto.fabricanteId }
        });
    
        if (!fabricante) {
            throw new NotFoundException('Fabricante não encontrado com o id ' + dto.fabricanteId);
        }
    
        const newRemedio = this.remedioRepository.create({
            ...dto,
            fabricante,
        });
    
        this.validateRemedio(newRemedio);
    
        return this.remedioRepository.save(newRemedio);
    }

    async update(dto: RemedioDto) {
        const existingRemedio = await this.findById(dto.id);
    
        const fabricante = await this.fabricanteRepository.findOne({
            where: { id: dto.fabricanteId }
        });
    
        if (!fabricante) {
            throw new NotFoundException('Fabricante não encontrado com o id ' + dto.fabricanteId);
        }
    
        const updatedRemedio = this.remedioRepository.create({
            ...existingRemedio,
            ...dto,
            fabricante,
        });
    
        this.validateRemedio(updatedRemedio);
    
        return this.remedioRepository.save(updatedRemedio);
    }
    

    private validateRemedio(remedio: RemedioEntity | RemedioDto) {
        this.validateRemedioValidade(remedio);
        this.validateRemedioControladoSaldo(remedio);
        this.validateRemedioTipoControlado(remedio);
    }

    private validateRemedioValidade(remedio: RemedioEntity | RemedioDto) {
        const dataAtual = new Date();
        const dataValidade = new Date(remedio.dataValidade);

        if (dataValidade < dataAtual) {
            throw new BadRequestException('A data de validade do remédio não pode ser menor que a data atual');
        }
    }

    private validateRemedioControladoSaldo(remedio: RemedioEntity | RemedioDto) {
        if (remedio.controlado && remedio.saldo <= 0) {
            throw new BadRequestException('O saldo de um remédio controlado não pode ser zero ou negativo');
        }
    }

    private validateRemedioTipoControlado(remedio: RemedioEntity | RemedioDto) {
        if (remedio.tipo === TipoEnum.GENERICO && remedio.controlado) {
            throw new BadRequestException('Um remédio do tipo GENÉRICO não pode ser controlado');
        }
    }

    private adicionarSaldo(remedio: RemedioEntity, quantidadeAdicional: number) {
        remedio.saldo += quantidadeAdicional;
    }
    
    private removerSaldo(remedio: RemedioEntity, quantidadeAdicional: number) {
        remedio.saldo -= quantidadeAdicional;
    }



}
