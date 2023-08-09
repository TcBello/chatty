const { Schema, default: mongoose } = require("mongoose");

const chatRoomSchema = new Schema(
  {
    id: String,
    participants: [
      {
        id: String,
        username: String,
        image: String,
      },
      {
        id: String,
        username: String,
        image: String,
      },
    ],
    isActive: Boolean,
  },
  { timestamps: true }
);

const ChatRoomModel = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoomModel;
