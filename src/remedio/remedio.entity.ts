import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoEnum } from "./tipo.enum";
import { FabricanteEntity } from "src/fabricante/fabricante.entity";
import { IsNotEmpty } from "class-validator";
import { SintomasEntity } from "src/sintomas/sintomas.entity"; 


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

    @ManyToOne(() => FabricanteEntity, (fabricante) => fabricante.remedios)
    @JoinColumn({ name: "fabricante_id" })
    fabricante: FabricanteEntity;

    @ManyToMany(() => SintomasEntity, (sintomas) => sintomas.remedios)
    @JoinTable({
        name: 'remedios_sintomas',
        joinColumn: { name: 'remedio_id' },
        inverseJoinColumn: { name: 'sintomas_id'},
    })
    sintomas: SintomasEntity[];

}