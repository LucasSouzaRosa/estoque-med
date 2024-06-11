import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { PrincipiosAtivosEntity } from "./principios_ativos.entity";
import { PrincipiosativosService } from "./principios_ativos.service";
import { principios_ativosController } from "./principios_ativos.controller";

@Module({
    imports: [TypeOrmModule.forFeature([PrincipiosAtivosEntity])],
    controllers: [principios_ativosController],
    providers: [PrincipiosativosService],
})
export class PrincipiosAtivosModule{}