import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FabricanteEntity } from './fabricante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FabricanteDto } from './fabricante.dto';

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
    
        this.validateFabricante(newFabricante);
    
        return this.fabricanteRepository.save(newFabricante);
    }

    async update(fabricante: FabricanteDto) {
        await this.findById(fabricante.id);
    
        this.validateFabricante(fabricante);
    
        return this.fabricanteRepository.save(fabricante);
    }

    private validateFabricante(fabricante: FabricanteEntity | FabricanteDto) {
        this.validarCnpj(fabricante.cnpj);
        this.validarTelefone(fabricante.telefone);
        this.validarEmail(fabricante.email);
    }

    private validarCnpj(cnpj: string) {
        if (cnpj.length !== 14) {
            throw new BadRequestException('CNPJ deve ter exatamente 14 caracteres');
        }
    }

    private validarTelefone(telefone: string) {
        const telefoneLength = telefone.length;
        if (telefoneLength < 8 || telefoneLength > 11) {
            throw new BadRequestException('Telefone deve ter entre 8 e 11 caracteres');
        }
    }

    private validarEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            throw new BadRequestException('Email deve ter um formato válido');
        }

    }
}