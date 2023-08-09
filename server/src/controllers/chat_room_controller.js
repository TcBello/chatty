const asyncHandler = require("express-async-handler");
const ChatRoomModel = require("../models/chat_room_model");
const UserModel = require("../models/user_model");
const { v4: uuidv4 } = require("uuid");

function _sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const searchChatRoom = asyncHandler(async (req, res) => {
  const { currentUserID } = req.body;
  const currentUser = await UserModel.findOne({ id: currentUserID });
  currentUser.chattingState = "searching";
  await currentUser.save();
  let retryCount = 0;
  let otherUser = null;

  while (retryCount <= 10 && otherUser === null) {
    await _sleep(1000);
    const chatRoom = await ChatRoomModel.findOne({
      "participants.id": currentUserID,
      isActive: true,
    });

    if (chatRoom) {
      res.status(201).json({ message: "Chatroom created" });
      break;
    }

    otherUser = await UserModel.findOne({
      id: { $ne: currentUserID },
      chattingState: "searching",
      "preferences.gender": currentUser.preferences.gender,
      "preferences.country": currentUser.preferences.country,
      "preferences.interests":
        currentUser.preferences.interests.length > 0
          ? { $in: currentUser.preferences.interests }
          : currentUser.preferences.interests,
    });
    retryCount += 1;
  }

  if (retryCount > 10 && otherUser === null) {
    res.status(200).json({ message: "No user can't be matched at a moment" });
  }

  if (otherUser) {
    const chatRoom = await ChatRoomModel.create({
      id: uuidv4(),
      participants: [
        {
          id: currentUser.id,
          username: currentUser.username,
          image: currentUser.image,
        },
        {
          id: otherUser.id,
          username: otherUser.username,
          image: otherUser.image,
        },
      ],
      isActive: true,
    });
    const doc = await chatRoom.save();
    if (doc) {
      currentUser.chattingState = "chatting";
      otherUser.chattingState = "chatting";
      await currentUser.save();
      await otherUser.save();
      res.status(201).json({ message: "Chatroom created" });
    } else {
      res.status(404).json({ message: "Failed to create chat room" });
    }
  }
});

const endChat = asyncHandler(async (req, res) => {
  const { currentUserID } = req.body;
  const currentChatRoom = await ChatRoomModel.findOne({
    "participants.id": currentUserID,
    isActive: true,
  });

  if (currentChatRoom) {
    const user1 = await UserModel.findOne({
      id: currentChatRoom.participants[0].id,
    });
    const user2 = await UserModel.findOne({
      id: currentChatRoom.participants[1].id,
    });

    user1.chattingState = "idle";
    user2.chattingState = "idle";
    await user1.save();
    await user2.save();

    await currentChatRoom.deleteOne();

    res.status(200).json({ message: "Chatroom deleted" });
  } else {
    res.status(404).json({ message: "Chat room does not exists" });
  }
});

const getChatRoom = asyncHandler(async (req, res) => {
  const { userID } = req.body;

  const chatRoom = await ChatRoomModel.findOne({
    "participants.id": userID,
    isActive: true,
  });

  if (chatRoom) {
    res.status(200).json({ message: "Chatroom obtained", data: chatRoom });
  } else {
    res.status(404).json({ message: "Chatroom does not exist", data: {} });
  }
});

module.exports.searchChatRoom = searchChatRoom;
module.exports.endChat = endChat;
module.exports.getChatRoom = getChatRoom;
