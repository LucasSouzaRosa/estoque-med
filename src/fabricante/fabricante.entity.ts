import { RemedioEntity } from "src/remedio/remedio.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'fabricante'})
export class FabricanteEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    razaosocial: string;

    @Column()
    cnpj: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @ManyToMany(() => RemedioEntity, (remedio) => remedio.fabricantes)
    remedios: RemedioEntity[]
}