import { RemedioEntity } from "src/remedio/remedio.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sintomas'})
export class SintomasEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @ManyToMany(() => RemedioEntity, (remedio) => remedio.sintomas)
    remedios: RemedioEntity[]

    @Column()
    ativo: boolean;
}