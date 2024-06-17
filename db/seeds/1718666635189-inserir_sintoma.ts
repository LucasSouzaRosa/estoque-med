import { MigrationInterface, QueryRunner } from "typeorm";

export class InserirSintoma1718664380500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO sintomas (id, nome, ativo) VALUES
            ('418f6fef-e83b-46e7-8d3f-d121a65223a6', 'Dor de Cabeça', true),
            ('dfbe6f9f-27e3-4d2d-ab85-8e94da895ded', 'Febre', true),  -- Corrigido aqui
            ('bd532d32-bcc9-4fa4-a803-c80288db41b8', 'Tosse', true),
            ('9033b0d4-f4b0-46a3-820b-5459fef05b52', 'Dor de Garganta', true),
            ('14f902c9-d51f-40fd-a937-997661bdcb28', 'Falta de Ar', false);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM sintomas WHERE id IN (
                '418f6fef-e83b-46e7-8d3f-d121a65223a6',
                'dfbe6f9f-27e3-4d2d-ab85-8e94da895ded',
                'bd532d32-bcc9-4fa4-a803-c80288db41b8',
                '9033b0d4-f4b0-46a3-820b-5459fef05b52',
                '14f902c9-d51f-40fd-a937-997661bdcb28'
            );
        `);
    }

}
