import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
	name: 'default',
	type: 'postgres',
	url: process.env.POSTGRES_URL,
	ssl: { rejectUnauthorized: false },
	entities: [join(__dirname, '../../**/*.entity.js')],
	migrations: [join(__dirname, '../migrations/*{.ts, .js}')],
	synchronize: false,
};

export const mysqlDataSource = new DataSource(
	typeormConfig as DataSourceOptions,
);
