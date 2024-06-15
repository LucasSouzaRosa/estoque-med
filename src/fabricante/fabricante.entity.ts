import { RemedioEntity } from "src/remedio/remedio.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ default: true })
    ativo: boolean;

    @OneToMany(() => RemedioEntity, (remedio) => remedio.fabricante)
    remedios: RemedioEntity[];

    @Column()
    licencaativa: boolean;
}