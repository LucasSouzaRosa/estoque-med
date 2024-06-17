import { MigrationInterface, QueryRunner } from "typeorm";

export class InserirFabricante1718664221597 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO fabricante (id, razaosocial, cnpj, email, telefone, ativo, licencaativa) VALUES
            ('6f075571-8bbb-427a-b54e-9396ec0f5a22', 'Medicamentos Brasil S.A.', '12.345.678/0001-90', 'contato@medbrasil.com.br', '(11) 98765-4321', true, true),
            ('d6dcb104-8bcc-4c03-ba4a-6b883b15dfe4', 'Farmácia Vida Ltda', '23.456.789/0001-01', 'suporte@farmaciavida.com', '(21) 91234-5678', true, false),
            ('958d7be6-44db-4a5f-aeda-696cd90447a7', 'Laboratórios Saúde e Vida', '34.567.890/0001-12', 'info@saudeevida.com.br', '(31) 99876-5432', true, true),
            ('4103fdcc-ed69-4307-bd44-37f0ba96cffc', 'PharmaMax Distribuidora', '45.678.901/0001-23', 'vendas@pharmax.com', '(41) 93456-7890', false, false),
            ('ba431cd9-c6c3-497e-8dea-c41156dce540', 'Remédios Populares Inc.', '56.789.012/0001-34', 'admin@remediospopulares.com', '(51) 98765-1234', true, true);

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM fabricante WHERE id IN (
                '6f075571-8bbb-427a-b54e-9396ec0f5a22',
                'd6dcb104-8bcc-4c03-ba4a-6b883b15dfe4',
                '958d7be6-44db-4a5f-aeda-696cd90447a7',
                '4103fdcc-ed69-4307-bd44-37f0ba96cffc',
                'ba431cd9-c6c3-497e-8dea-c41156dce540'
            );

        `);
    }

}
