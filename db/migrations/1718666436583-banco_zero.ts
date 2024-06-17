import { MigrationInterface, QueryRunner } from "typeorm";

export class BancoZero1718666436583 implements MigrationInterface {
    name = 'BancoZero1718666436583'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fabricante" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "razaosocial" character varying NOT NULL, "cnpj" character varying NOT NULL, "email" character varying NOT NULL, "telefone" character varying NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "licencaativa" boolean NOT NULL, CONSTRAINT "PK_3e7c3d76edc644d8d7f8d9a4670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."remedios_tipo_enum" AS ENUM('G', 'O')`);
        await queryRunner.query(`CREATE TABLE "remedios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "descricao" character varying(300) NOT NULL, "saldo" integer NOT NULL, "tipo" "public"."remedios_tipo_enum" NOT NULL DEFAULT 'O', "data_validade" date NOT NULL, "controlado" boolean NOT NULL, "fabricante_id" uuid, CONSTRAINT "PK_8d0eb457ff97c618d61ec9222a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sintomas" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "ativo" boolean NOT NULL, CONSTRAINT "PK_1bf684d2aaf9a4079ab4b4164a0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "remedios_sintomas" ("remedio_id" uuid NOT NULL, "sintomas_id" uuid NOT NULL, CONSTRAINT "PK_0b1e747bf8b68db1bdccc76004e" PRIMARY KEY ("remedio_id", "sintomas_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_02c0e879715601f3b3159353b8" ON "remedios_sintomas" ("remedio_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7ab0b2db2f3e484510696ef13c" ON "remedios_sintomas" ("sintomas_id") `);
        await queryRunner.query(`ALTER TABLE "remedios" ADD CONSTRAINT "FK_49e0657ac505a3fad11b0743eae" FOREIGN KEY ("fabricante_id") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "remedios_sintomas" ADD CONSTRAINT "FK_02c0e879715601f3b3159353b89" FOREIGN KEY ("remedio_id") REFERENCES "remedios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "remedios_sintomas" ADD CONSTRAINT "FK_7ab0b2db2f3e484510696ef13c1" FOREIGN KEY ("sintomas_id") REFERENCES "sintomas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "remedios_sintomas" DROP CONSTRAINT "FK_7ab0b2db2f3e484510696ef13c1"`);
        await queryRunner.query(`ALTER TABLE "remedios_sintomas" DROP CONSTRAINT "FK_02c0e879715601f3b3159353b89"`);
        await queryRunner.query(`ALTER TABLE "remedios" DROP CONSTRAINT "FK_49e0657ac505a3fad11b0743eae"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7ab0b2db2f3e484510696ef13c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_02c0e879715601f3b3159353b8"`);
        await queryRunner.query(`DROP TABLE "remedios_sintomas"`);
        await queryRunner.query(`DROP TABLE "sintomas"`);
        await queryRunner.query(`DROP TABLE "remedios"`);
        await queryRunner.query(`DROP TYPE "public"."remedios_tipo_enum"`);
        await queryRunner.query(`DROP TABLE "fabricante"`);
    }

}
