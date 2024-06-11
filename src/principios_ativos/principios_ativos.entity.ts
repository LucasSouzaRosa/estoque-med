import { RemedioEntity } from "src/remedio/remedio.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'principiosativos'})
export class PrincipiosAtivosEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @ManyToMany(() => RemedioEntity, (remedio) => remedio.principios_ativos)
    remedios: RemedioEntity[]

    @Column()
    ativo: boolean;
}