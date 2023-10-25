const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/", usersCtrl.create);
router.post("/addrecord", ensureLoggedIn, usersCtrl.saveRecord);
router.delete(
  "/deleterecord/:recordId/:userId",
  ensureLoggedIn,
  usersCtrl.deleteRecord
);

router.post("/login", usersCtrl.login);
router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);
router.post("/recordhistory", usersCtrl.getAllData);

module.exports = router;
