import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { PrincipiosAtivosEntity } from './principios_ativos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PrincipiosAtivosDto } from './principios_ativos.dto';

@Injectable()
export class PrincipiosativosService {
    constructor(
        @InjectRepository(PrincipiosAtivosEntity)
        private principiosativosRepository: Repository<PrincipiosAtivosEntity>, 
    ) {}

    findAll() {
        return this.principiosativosRepository.find({
            relations: { remedios: true},
        });
    }

    async findById(id: string): Promise<PrincipiosAtivosEntity> {
        const findOne = await this.principiosativosRepository.findOne({
            where: { id },
            relations: { remedios: true },
        });
        if (!findOne) {
            throw new NotFoundException('Princípio ativo não encontrado com o id ' + id);
        }
        return findOne;
    }

    async remove(id: string) {
        const findById = await this.findById(id);
        await this.principiosativosRepository.remove(findById);
        return { ...findById, id };
    }

    async create(dto: PrincipiosAtivosDto) {
        const newPrincipioAtivo = this.principiosativosRepository.create(dto);

        this.validatePrincipioAtivo(newPrincipioAtivo);
    
        return this.principiosativosRepository.save(newPrincipioAtivo);
    }

    async update(principios_ativos: PrincipiosAtivosDto) {
        await this.findById(principios_ativos.id);

        this.validatePrincipioAtivo(principios_ativos);

        return this.principiosativosRepository.save(principios_ativos);
    }

   
    private validatePrincipioAtivo(principios_ativos: PrincipiosAtivosEntity | PrincipiosAtivosDto) {
        
    }



}
