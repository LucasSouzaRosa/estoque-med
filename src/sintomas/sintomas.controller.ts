import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { SintomasService } from './sintomas.service';
import { SintomasDto } from './sintomas.dto';

@Controller('sintomas')
export class SintomasController {
    constructor(private SintomasService: SintomasService) {}

    @Get()
    findAll() {
        return this.SintomasService.findAll();
    }
    @Get(':id')
    findById(@Param('id') id: string) {
      return this.SintomasService.findById(id);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.SintomasService.remove(id);
    }
  
    @Post()
    create(@Body() dto: SintomasDto) {
      return this.SintomasService.create(dto);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() dto: SintomasDto) {
      return this.SintomasService.update({ id, ...dto });
    }

    
}

