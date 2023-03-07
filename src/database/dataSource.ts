import { DataSource } from "typeorm";
import { applicationConfig } from "../../config"

export const dataSource = new DataSource({
  type: "postgres",
  host: applicationConfig.db.host || "localhost",
  port: parseInt(applicationConfig.db.port),
  username: applicationConfig.db.username,
  password: applicationConfig.db.password,
  database: applicationConfig.db.name,
  entities: ["src/entity/*.ts"],
  logging: true,
  synchronize: true,
});

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });


