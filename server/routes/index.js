const express = require("express");
const router = express.Router();

const controller = require("../controllers");

router.route("/sendMail").post(controller.sendMail);

module.exports = router;
