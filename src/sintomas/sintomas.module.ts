import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { SintomasEntity } from "./sintomas.entity";
import { SintomasService } from "./sintomas.service";
import { SintomasController } from "./sintomas.controller";

@Module({
    imports: [TypeOrmModule.forFeature([SintomasEntity])],
    controllers: [SintomasController],
    providers: [SintomasService],
})
export class SintomasModule{}