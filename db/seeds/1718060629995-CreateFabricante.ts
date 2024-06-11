import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFabricante1718060629995 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "INSERT INTO fabricante (id, razaosocial, cnpj, email, telefone, ativo, licencaativa) VALUES " +
            "('d75d52b5-8dbb-4e0b-b5f5-ebf140fd08c7', 'Empresa A', '12345678900001', 'empresaA@example.com', '(11) 1234-5678', true, false);" +

            "INSERT INTO fabricante (id, razaosocial, cnpj, email, telefone, ativo, licencaativa) VALUES " + 
            "('1d725a47-55e3-4382-b07a-90a5b88cf392', 'Empresa B', '98765432100001', 'empresaB@example.com', '(22) 9876-5432', false, false);" +

            "INSERT INTO fabricante (id, razaosocial, cnpj, email, telefone,  ativo, licencaativa) VALUES " + 
            "('56af8097-75b7-4c2d-ae27-2786a440edeb', 'Empresa C', '45678912300001', 'empresaC@example.com', '(33) 4567-8901', true, true)"

        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "DELETE FROM fabricante WHERE id = 'd75d52b5-8dbb-4e0b-b5f5-ebf140fd08c7'; " +
            "DELETE FROM fabricante WHERE id = '1d725a47-55e3-4382-b07a-90a5b88cf392'; " +
            "DELETE FROM fabricante WHERE id = '56af8097-75b7-4c2d-ae27-2786a440edeb'"
        );
    }

}
