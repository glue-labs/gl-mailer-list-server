import express = require("express");
import contactRoutes from "./contact.route";
const router = express.Router();

router.use('/',contactRoutes)

export default router;