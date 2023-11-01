const express = require("express");
const router = express.Router();
const hcProfCtrl = require("../../controllers/api/hcProfCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

router.post("/addcomment", ensureLoggedIn, hcProfCtrl.createComment);
router.get(
  "/:recordId/getallcomment",
  ensureLoggedIn,
  hcProfCtrl.getAllComments
);

module.exports = router;
