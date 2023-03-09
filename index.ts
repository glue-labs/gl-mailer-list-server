import express = require("express");
import "dotenv/config";
import routes from "./src/routes/index";
import { dataSource } from "./src/database/dataSource";
import bodyParser = require('body-parser');
import { applicationConfig } from "./config";

const PORT = applicationConfig.app.port;

const app = express();

app.use(bodyParser.json())

app.use("/", routes);

app.listen(PORT, () =>
  console.log(`Server is listening on port http://localhost:${PORT}`)
);
