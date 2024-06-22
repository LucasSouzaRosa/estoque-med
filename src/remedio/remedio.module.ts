import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { RemedioEntity } from "./remedio.entity";
import { RemedioService } from "./remedio.service";
import { RemedioController } from "./remedio.controller";
import { FabricanteEntity } from "src/fabricante/fabricante.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RemedioEntity, FabricanteEntity])],
    controllers: [RemedioController],
    providers: [RemedioService],
})
export class RemedioModule{}