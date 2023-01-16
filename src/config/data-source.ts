import { DataSource, DataSourceOptions } from "typeorm";
export const dataSourceOptions: DataSourceOptions = {
	type: 'postgres',
	database: 'db_nest',
	username: 'postgres',
	password: 'uaaatsn9646485',
	host: 'localhost',
	port: 5432,
	entities: ['dist/**/*.entity{.ts,.js}'],
	migrations: ['dist/migrations/*{.ts,.js}'],
	logging: true,
	synchronize: false,
};
const dataSource =
	new DataSource(dataSourceOptions);
export default dataSource;