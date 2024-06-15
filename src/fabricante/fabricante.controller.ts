import { Body, Controller, Delete, Get, Param, Post, Put, } from '@nestjs/common';
import { FabricanteService } from './fabricante.service';
import { FabricanteDto } from './fabricante.dto';

@Controller ('fabricantes')
export class FabricanteController {
    constructor(private fabricanteService: FabricanteService) {}

    @Get()
    findAll() {
        return this.fabricanteService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.fabricanteService.findById(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.fabricanteService.remove(id);
    }

    @Post()
    create(@Body() dto: FabricanteDto) {
        return this.fabricanteService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: FabricanteDto) {
        return this.fabricanteService.update({ id, ...dto });
    }
}

