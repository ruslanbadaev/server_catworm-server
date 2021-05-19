const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");
const ScriptsController = require("../controllers/scripts");

router.post("/script", AuthController.checkToken, ScriptsController.runScript);

module.exports = router;
