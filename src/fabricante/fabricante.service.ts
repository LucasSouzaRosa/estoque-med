import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FabricanteEntity } from './fabricante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FabricanteDto } from './fabricante.dto';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class FabricanteService {
    constructor(
      @InjectRepository(FabricanteEntity)
      private fabricanteRepository: Repository<FabricanteEntity>,
    ) {}

    findAll() {
        return this.fabricanteRepository.find({
          relations: { remedios: true },
        });
    }    

    async findById(id: string): Promise<FabricanteEntity> {
        const findOne = await this.fabricanteRepository.findOne({
          where: { id },
          relations: { remedios: true },
        });
        if (!findOne) {
          throw new NotFoundException('Fabricante não encontrado com o id ' + id);
        }
        return findOne;
    }

    async remove(id: string) {
        const findById = await this.findById(id);
        await this.fabricanteRepository.remove(findById);
        return { ...findById, id };
    }

    async create(dto: FabricanteDto) {
        const newFabricante = this.fabricanteRepository.create(dto);
    
        await this.validateFabricante(newFabricante, true);
    
        return this.fabricanteRepository.save(newFabricante);
    }
    
    async update(fabricante: FabricanteDto) {
        await this.findById(fabricante.id);
    
        await this.validateFabricante(fabricante, false);
    
        return this.fabricanteRepository.save(fabricante);
    }
    
    private async validateFabricante(fabricante: FabricanteEntity | FabricanteDto, isCreate: boolean) {
        if (isCreate) {
            await this.validateCnpjUnico(fabricante.cnpj);
        } else {
            await this.validateCnpjUnico(fabricante.cnpj, fabricante.id);
        }
        await this.validateFabricanteAtivo(fabricante.id);
        await this.validateLicencaFabricanteAtivo(fabricante.id);
    }
    
    private async validateCnpjUnico(cnpj: string, ignoreId?: string) {
        const query = this.fabricanteRepository.createQueryBuilder('fabricante')
            .where('fabricante.cnpj = :cnpj', { cnpj });
    
        if (ignoreId) {
            query.andWhere('fabricante.id != :id', { id: ignoreId });
        }
    
        const existingFabricante = await query.getOne();
    
        if (existingFabricante) {
            throw new BadRequestException('Já existe um fabricante com o CNPJ ' + cnpj);
        }
    }
    

    private async validateFabricanteAtivo(id: string) {
        const fabricante = await this.findById(id);
        if (!fabricante.ativo) {
            throw new BadRequestException('Fabricantes inativos não podem estar associados a novos remédios');
        }
    }

    private async validateLicencaFabricanteAtivo(id: string) {
        const fabricante = await this.findById(id);
        if (!fabricante.licencaativa) {
            throw new BadRequestException('Fabricantes com licenças inativas não podem estar associados a novos remédios');
        }
    }
}