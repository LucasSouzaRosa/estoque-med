import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { FabricanteEntity } from "./fabricante.entity";
import { FabricanteController } from "./fabricante.controller";
import { FabricanteService } from "./fabricante.service";

@Module({
    imports: [TypeOrmModule.forFeature([FabricanteEntity])],
    controllers: [FabricanteController],
    providers: [FabricanteService],
})
export class FabricanteModule {}