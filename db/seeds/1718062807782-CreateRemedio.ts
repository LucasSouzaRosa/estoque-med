import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRemedio1718062807782 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "INSERT INTO remedios (id, nome, descricao, saldo, tipo, data_validade, controlado) VALUES " +
            "('56af8097-75b7-4c2d-ae27-2786a440edeb', 'Dipirona', 'Analgésico para febre', 100, 'O', '2025-09-15', false);" +

            "INSERT INTO remedios (id, nome, descricao, saldo, tipo, data_validade, controlado)  VALUES " +
            "('1d725a47-55e3-4382-b07a-90a5b88cf392', 'Rivotril', 'Ansiolítico para ansiedade', 20, 'G', '2023-06-30', true);" +

            "INSERT INTO remedios (id, nome, descricao, saldo, tipo, data_validade, controlado)  VALUES " +
            "('3d2c2d51-48c3-4d29-93ff-b5a8ef30eb1b', 'Dorflex', 'Analgésico para dor muscular', 50, 'O', '2024-12-31', false)"
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "DELETE FROM remedios WHERE id = '56af8097-75b7-4c2d-ae27-2786a440edeb'; " +
            "DELETE FROM remedios WHERE id = '1d725a47-55e3-4382-b07a-90a5b88cf392'; " +
            "DELETE FROM remedios WHERE id = '3d2c2d51-48c3-4d29-93ff-b5a8ef30eb1b'"
        );
    }

}
