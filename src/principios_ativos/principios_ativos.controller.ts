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
import { principios_ativos } from './principios_ativos.dto';

@Controller('PrincipiosAtivos')
export class principios_ativosController {
    constructor(private PrincipiosAtivosController: principios_ativos) {}

    @Get()
    findAll() {
        return this.PrincipiosAtivosController.findAll();
    }
    @Get(':id')
    findById(@Param('id') id: string) {
      return this.PrincipiosAtivosController.findById(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.PrincipiosAtivosController.remove(id);
    }
  
    @Post()
    create(@Body() dto: principios_ativos) {
      return this.PrincipiosAtivosController.create(dto);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: principios_ativos) {
      return this.PrincipiosAtivosController.update({ id, ...dto });
    }

    
}

