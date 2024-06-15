import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { SintomasEntity } from './sintomas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SintomasDto } from './sintomas.dto';

@Injectable()
export class SintomasService {
    constructor(
        @InjectRepository(SintomasEntity)
        private sintomasRepository: Repository<SintomasEntity>, 
    ) {}

    findAll() {
        return this.sintomasRepository.find({
            relations: { remedios: true},
        });
    }

    async findById(id: string): Promise<SintomasEntity> {
        const findOne = await this.sintomasRepository.findOne({
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
        await this.sintomasRepository.remove(findById);
        return { ...findById, id };
    }

    async create(dto: SintomasDto) {
        const newSintoma = this.sintomasRepository.create(dto);

        this.validateSintoma(newSintoma);
    
        return this.sintomasRepository.save(newSintoma);
    }

    async update(sintoma: SintomasDto) {
        await this.findById(sintoma.id);

        this.validateSintoma(sintoma);

        return this.sintomasRepository.save(sintoma);
    }

   
    private validateSintoma(sintomas: SintomasEntity | SintomasDto) {
        
    }



}
