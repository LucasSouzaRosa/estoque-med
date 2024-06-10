import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { RemedioEntity } from "./remedio.entity";
import { RemedioService } from "./remedio.service";
import { RemedioController } from "./remedio.controller";

@Module({
    imports: [TypeOrmModule.forFeature([RemedioEntity])],
    controllers: [RemedioController],
    providers: [RemedioService],
})
export class RemedioModule{}