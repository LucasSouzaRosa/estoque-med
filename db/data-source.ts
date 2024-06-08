import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    database: 'estoque-remedios',
    username: 'postgres',
    password: '0667',
    port: 5432,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
}

export default new DataSource(dataSourceOptions);
