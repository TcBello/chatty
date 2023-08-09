const express = require("express");
const {
  sendMessage,
  getMessage,
} = require("../controllers/message_controller");

const router = express.Router();

router.route("/").post(sendMessage);
router.route("/:roomID").get(getMessage);

module.exports.MessageRoutes = router;
