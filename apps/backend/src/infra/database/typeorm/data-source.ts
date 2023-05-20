import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/infra/database/typeorm/migrations/*.js'],
  useUTC: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
