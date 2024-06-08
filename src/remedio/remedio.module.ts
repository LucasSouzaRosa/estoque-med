import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { RemedioEntity } from "./remedio.entity";

@Module({
    imports: [TypeOrmModule.forFeature([RemedioEntity])],
})
export class RemedioModule{}