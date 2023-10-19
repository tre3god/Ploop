const express = require("express");
const router = express.Router();
const recordCtrl = require("../../controllers/api/recordCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/", ensureLoggedIn, recordCtrl.createRecord);

module.exports = router;
