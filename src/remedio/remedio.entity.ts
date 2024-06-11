import { Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoEnum } from "./tipo.enum";
import { FabricanteEntity } from "src/fabricante/fabricante.entity";
import { IsNotEmpty } from "class-validator";
import { PrincipiosAtivosEntity } from "src/principios_ativos/principios_ativos.entity";


@Entity({ name: 'remedios'})
export class RemedioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 100 })
    @IsNotEmpty()
    nome: string;

    @Column({ length: 300})
    descricao: string;

    @Column()
    saldo: number;

    @Column({
        type: 'enum',
        enum: TipoEnum,
        default: TipoEnum.ORIGINAL,
        nullable: false,
      })
    tipo: TipoEnum;

    @Column({ type: 'date', name: 'data_validade', nullable: false })
    dataValidade: Date;
    
    @Column()
    controlado: boolean;

    @ManyToMany(() => FabricanteEntity, (fabricante) => fabricante.remedios)
    @JoinTable({
        name: 'remedios_fabricantes',
        joinColumn: { name: 'remedio_id' },
        inverseJoinColumn: { name: 'fabricante_id'},
    })
    fabricantes: FabricanteEntity[];

    @ManyToMany(() => PrincipiosAtivosEntity, (principios_ativos) => principios_ativos.remedios)
    @JoinTable({
        name: 'remedios_principiosAtivos',
        joinColumn: { name: 'remedio_id' },
        inverseJoinColumn: { name: 'principiosAtivos_id'},
    })
    principios_ativos: FabricanteEntity[];

}