import { MigrationInterface, QueryRunner } from "typeorm";

export class InserirSintomaVsRemedio1718666788673 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO remedios_sintomas (remedio_id, sintomas_id) VALUES
            ('6c580850-adce-44b0-a68f-06642871302d', '418f6fef-e83b-46e7-8d3f-d121a65223a6'),
            ('00cd95f2-3298-4724-b957-20498af84225', 'dfbe6f9f-27e3-4d2d-ab85-8e94da895ded');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
