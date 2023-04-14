import { parse } from "pg-connection-string";

interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl: boolean;
}

interface ConnectionConfig {
  client: string;
  connection: DatabaseConfig;
  debug: boolean;
}

const config = parse(process.env.DATABASE_URL);

const databaseConfig: DatabaseConfig = {
  host: config.host || '',
  port: parseInt(config.port || ''),
  database: config.database || '',
  user: config.user || '',
  password: config.password || '',
  ssl: false,
};

const connectionConfig: ConnectionConfig = {
  client: "postgres",
  connection: databaseConfig,
  debug: false,
};

export default connectionConfig;
