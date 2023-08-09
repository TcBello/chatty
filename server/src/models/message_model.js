const { Schema, default: mongoose } = require("mongoose");

const messageSchema = new Schema(
  {
    id: String,
    chatRoomID: String,
    sender: {
      id: String,
      username: String,
    },
    text: String,
    type: String,
    imageURL: String,
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = MessageModel;
