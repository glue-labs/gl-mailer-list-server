import { join } from "path";
import { DataSource } from "typeorm";
import { applicationConfig } from "../../config"

export const dataSource = new DataSource({
  type: "postgres",
  host: applicationConfig.db.host || "localhost",
  port: parseInt(applicationConfig.db.port),
  username: applicationConfig.db.username,
  password: applicationConfig.db.password,
  database: applicationConfig.db.name,
  entities: [join(__dirname, '/../entity/*.entity{.ts,.js}')],
  logging: false,
  synchronize: true,
});