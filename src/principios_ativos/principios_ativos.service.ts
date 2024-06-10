import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { PrincipiosAtivosEntity } from './principios_ativos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PrincipiosativosDto } from './principios_ativos.dto';

@Injectable()
export class PrincipiosativosService {
    constructor(
        @InjectRepository(PrincipiosAtivosEntity)
        private principiosativosRepository: Repository<PrincipiosAtivosEntity>, 
    ) {}

    findAll() {
        return this.principiosativosRepository.find({
            relations: { remedio: true},
        });
    }

    async findById(id: string): Promise<PrincipiosAtivosEntity> {
        
    }

    async remove(id: string) {
        const findById = await this.findById(id);
        await this.principiosativosRepository.remove(findById);
        return { ...findById, id };
    }

    async create(dto: PrincipiosativosDto) {
        const newPrincipioAtivo = this.principiosativosRepository.create(dto);

        this.validatePrincipioAtivo(newPrincipioAtivo);
    
        return this.principiosativosRepository.save(newPrincipioAtivo);
    }

    async update(principios_ativos: PrincipiosativosDto) {
        await this.findById(principios_ativos.id);

        this.validatePrincipioAtivo(principios_ativos);

        return this.principiosativosRepository.save(principios_ativos);
    }

   
    



}
