import express = require("express");
import { Request, Response } from 'express';

import "dotenv/config";
import routes from "./src/routes/index";
import { applicationConfig } from "./config";
import { dataSource } from "./src/database/dataSource";

const PORT = applicationConfig.app.port;

const app = express();

app.use(express.json())

app.get("/", (req: Request, res: Response) => {
  return res.send('Hi! Server is up.')
});

app.use("/", routes);

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    
    app.listen(PORT, () =>
      console.log(`⚡ Server is listening on port http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
