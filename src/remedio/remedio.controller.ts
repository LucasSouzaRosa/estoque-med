import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { RemedioService } from './remedio.service';
import { RemedioDto } from './remedio.dto';

@Controller('remedios')
export class RemedioController {
    constructor(private remedioService: RemedioService) {}

    @Get()
    findAll() {
        return this.remedioService.findAll();
    }
    @Get(':id')
    findById(@Param('id') id: string) {
      return this.remedioService.findById(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.remedioService.remove(id);
    }
  
    @Post()
    create(@Body() dto: RemedioDto) {
      return this.remedioService.create(dto);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: RemedioDto) {
      return this.remedioService.update({ id, ...dto });
    }

    @Get('por-sintoma/:sintomaId')
    findBySintomaId(@Param('sintomaId') sintomaId: string) {
        return this.remedioService.findBySintomaId(sintomaId);
    }
}

