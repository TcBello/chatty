const asyncHandler = require("express-async-handler");
const MessageModel = require("../models/message_model");
const { v4: uuidv4 } = require("uuid");

const sendMessage = asyncHandler(async (req, res) => {
  const messageModel = await MessageModel.create(req.body);
  await messageModel.save();
  res.status(200).json({ message: "Message sent" });
});

const getMessage = asyncHandler(async (req, res) => {
  const { roomID } = req.params;

  var messages = await MessageModel.find({ chatRoomID: roomID });

  // if (messages) {
  //   res.status(200).json({ message: "Messages obtained", data: messages });
  // } else {
  //   res.status(404).json({ message: "Unable to obtain messages", data: [] });
  // }

  res.status(200).json({ message: "Messages obtained", data: messages ?? [] });
});

module.exports.sendMessage = sendMessage;
module.exports.getMessage = getMessage;
