import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { RemedioEntity } from './remedio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RemedioDto } from './remedio.dto';

@Injectable()
export class RemedioService {
    constructor(
        @InjectRepository(RemedioEntity)
        private remedioRepository: Repository<RemedioEntity>, 
    ) {}

    findAll() {
        return this.remedioRepository.find({
            relations: { fabricantes: true},
        });
    }

    async findById(id: string): Promise<RemedioEntity> {
        const findOne = await this.remedioRepository.findOne({
            where: { id },
            relations: { fabricantes: true },
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
        const newRemedio = this.remedioRepository.create(dto);

        this.validateRemedio(newRemedio);
    
        return this.remedioRepository.save(newRemedio);
    }

    async update(remedio: RemedioDto) {
        await this.findById(remedio.id);

        this.validateRemedio(remedio);

        return this.remedioRepository.save(remedio);
    }

    private validateRemedio(remedio: RemedioEntity | RemedioDto) {
        this.validateRemedioValidade(remedio);
    }

    private validateRemedioValidade(remedio: RemedioEntity | RemedioDto) {
        const dataAtual = new Date();
        const dataValidade = new Date(remedio.dataValidade);

        if (dataValidade < dataAtual) {
            throw new BadRequestException('A data de validade do remédio não pode ser menor que a data atual');
        }
    }
    



}
