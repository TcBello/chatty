const express = require("express");
const {
  searchChatRoom,
  endChat,
  getChatRoom,
} = require("../controllers/chat_room_controller");

const router = express.Router();

router.route("").post(getChatRoom);
router.route("/search").post(searchChatRoom);
router.route("/end").post(endChat);

module.exports.ChatRoomRoutes = router;
