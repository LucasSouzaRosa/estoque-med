import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { PrincipiosativosService } from './principios_ativos.service';
import { PrincipiosAtivosDto } from './principios_ativos.dto';

@Controller('PrincipiosAtivos')
export class principios_ativosController {
    constructor(private PrincipiosativosService: PrincipiosativosService) {}

    @Get()
    findAll() {
        return this.PrincipiosativosService.findAll();
    }
    @Get(':id')
    findById(@Param('id') id: string) {
      return this.PrincipiosativosService.findById(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.PrincipiosativosService.remove(id);
    }
  
    @Post()
    create(@Body() dto: PrincipiosAtivosDto) {
      return this.PrincipiosativosService.create(dto);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: PrincipiosAtivosDto) {
      return this.PrincipiosativosService.update({ id, ...dto });
    }

    
}

