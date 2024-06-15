import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { RemedioModule } from './remedio/remedio.module';
import { FabricanteModule } from './fabricante/fabricante.module';
import { SintomasModule } from './sintomas/sintomas.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), RemedioModule, FabricanteModule, SintomasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
