import { MigrationInterface, QueryRunner } from "typeorm";

export class BancoDoZero1718062700327 implements MigrationInterface {
    name = 'BancoDoZero1718062700327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "fabricante" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "razaosocial" character varying NOT NULL, "cnpj" character varying NOT NULL, "email" character varying NOT NULL, "telefone" character varying NOT NULL, "ativo" boolean NOT NULL DEFAULT true, "licencaativa" boolean NOT NULL, CONSTRAINT "PK_3e7c3d76edc644d8d7f8d9a4670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "principiosativos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "ativo" boolean NOT NULL, CONSTRAINT "PK_f487ab6024b14fe564927aca1fa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."remedios_tipo_enum" AS ENUM('G', 'O')`);
        await queryRunner.query(`CREATE TABLE "remedios" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying(100) NOT NULL, "descricao" character varying(300) NOT NULL, "saldo" integer NOT NULL, "tipo" "public"."remedios_tipo_enum" NOT NULL DEFAULT 'O', "data_validade" date NOT NULL, "controlado" boolean NOT NULL, CONSTRAINT "PK_8d0eb457ff97c618d61ec9222a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "remedios_fabricantes" ("remedio_id" uuid NOT NULL, "fabricante_id" uuid NOT NULL, CONSTRAINT "PK_381cae06e163a0fad85e994cd23" PRIMARY KEY ("remedio_id", "fabricante_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_698b04d2d425a8f8091137c1dc" ON "remedios_fabricantes" ("remedio_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9f990a5a7fff0c9917728dc9fa" ON "remedios_fabricantes" ("fabricante_id") `);
        await queryRunner.query(`CREATE TABLE "remedios_principiosAtivos" ("remedio_id" uuid NOT NULL, "principiosAtivos_id" uuid NOT NULL, CONSTRAINT "PK_817f2c732babbc84ddb3aa6080c" PRIMARY KEY ("remedio_id", "principiosAtivos_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a6892acc3a33351e7155f1ecd9" ON "remedios_principiosAtivos" ("remedio_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4a21341c68a3f59b3199c7d905" ON "remedios_principiosAtivos" ("principiosAtivos_id") `);
        await queryRunner.query(`ALTER TABLE "remedios_fabricantes" ADD CONSTRAINT "FK_698b04d2d425a8f8091137c1dc1" FOREIGN KEY ("remedio_id") REFERENCES "remedios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "remedios_fabricantes" ADD CONSTRAINT "FK_9f990a5a7fff0c9917728dc9fa4" FOREIGN KEY ("fabricante_id") REFERENCES "fabricante"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "remedios_principiosAtivos" ADD CONSTRAINT "FK_a6892acc3a33351e7155f1ecd9f" FOREIGN KEY ("remedio_id") REFERENCES "remedios"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "remedios_principiosAtivos" ADD CONSTRAINT "FK_4a21341c68a3f59b3199c7d905f" FOREIGN KEY ("principiosAtivos_id") REFERENCES "principiosativos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "remedios_principiosAtivos" DROP CONSTRAINT "FK_4a21341c68a3f59b3199c7d905f"`);
        await queryRunner.query(`ALTER TABLE "remedios_principiosAtivos" DROP CONSTRAINT "FK_a6892acc3a33351e7155f1ecd9f"`);
        await queryRunner.query(`ALTER TABLE "remedios_fabricantes" DROP CONSTRAINT "FK_9f990a5a7fff0c9917728dc9fa4"`);
        await queryRunner.query(`ALTER TABLE "remedios_fabricantes" DROP CONSTRAINT "FK_698b04d2d425a8f8091137c1dc1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4a21341c68a3f59b3199c7d905"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a6892acc3a33351e7155f1ecd9"`);
        await queryRunner.query(`DROP TABLE "remedios_principiosAtivos"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9f990a5a7fff0c9917728dc9fa"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_698b04d2d425a8f8091137c1dc"`);
        await queryRunner.query(`DROP TABLE "remedios_fabricantes"`);
        await queryRunner.query(`DROP TABLE "remedios"`);
        await queryRunner.query(`DROP TYPE "public"."remedios_tipo_enum"`);
        await queryRunner.query(`DROP TABLE "principiosativos"`);
        await queryRunner.query(`DROP TABLE "fabricante"`);
    }

}
