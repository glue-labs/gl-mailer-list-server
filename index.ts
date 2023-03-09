import express = require("express");
import "dotenv/config";
import routes from "./src/routes/index";
import { applicationConfig } from "./config";

const PORT = applicationConfig.app.port;

const app = express();

app.use(express.json())

app.use("/", routes);

app.listen(PORT, () =>
  console.log(`Server is listening on port http://localhost:${PORT}`)
);
