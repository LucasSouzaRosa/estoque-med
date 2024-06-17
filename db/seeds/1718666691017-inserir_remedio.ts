import { MigrationInterface, QueryRunner } from "typeorm";

export class InserirRemedio1718664726354 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO remedios (id, nome, descricao, saldo, tipo, data_validade, controlado, fabricante_id) VALUES
            ('6c580850-adce-44b0-a68f-06642871302d', 'Paracetamol 500mg', 'Analgésico e antitérmico.', 150, 'O', '2024-12-31', false, '6f075571-8bbb-427a-b54e-9396ec0f5a22'),
            ('00cd95f2-3298-4724-b957-20498af84225', 'Ibuprofeno 200mg', 'Anti-inflamatório e analgésico.', 200, 'O', '2025-01-15', false, 'd6dcb104-8bcc-4c03-ba4a-6b883b15dfe4'),
            ('248d7389-34b7-4634-aa11-ebcae356a84f', 'Amoxicilina 500mg', 'Antibiótico de amplo espectro.', 100, 'G', '2024-10-10', true, '958d7be6-44db-4a5f-aeda-696cd90447a7'),
            ('88aa0fb0-479b-460e-a0a7-fdf09f1748fb', 'Lorazepam 2mg', 'Ansiolítico controlado.', 50, 'O', '2025-03-20', true, '4103fdcc-ed69-4307-bd44-37f0ba96cffc'),
            ('eace1cfd-b296-46db-b057-e6505d71b718', 'Omeprazol 20mg', 'Inibidor de bomba de prótons.', 120, 'O', '2024-11-25', false, 'ba431cd9-c6c3-497e-8dea-c41156dce540');
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM remedios WHERE id IN (
                '6c580850-adce-44b0-a68f-06642871302d',
                '00cd95f2-3298-4724-b957-20498af84225',
                '248d7389-34b7-4634-aa11-ebcae356a84f',
                '88aa0fb0-479b-460e-a0a7-fdf09f1748fb',
                'eace1cfd-b296-46db-b057-e6505d71b718'
            );
        `);

    }

}
