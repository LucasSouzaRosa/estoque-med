import { MigrationInterface, QueryRunner } from "typeorm";

export class AjusteRazaoSocial1718670741187 implements MigrationInterface {
    name = 'AjusteRazaoSocial1718670741187'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fabricante" RENAME COLUMN "razaosocial" TO "razao_social"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fabricante" RENAME COLUMN "razao_social" TO "razaosocial"`);
    }

}
