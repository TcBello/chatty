import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { apiHost } from "../components/constants";
import { MessageEntity } from "../models/entities/message_entity";
import { DispatchStatus, MessageType } from "../components/enums";
import { SenderEntity } from "../models/entities/sender_entity";
import useChatViewModel from "../view-model/chat_view_model";
import useMessageViewModel from "../view-model/message_view_model";
import useUserViewModel from "../view-model/use_user_view_model";
import { useToast } from "@chakra-ui/react";
import { showErrorToast } from "../components/app_toast";
import { ChatRoomEntity } from "../models/entities/chat_room_entity";
import { v4 as uuidv4 } from "uuid";
import DataFirebaseStorageRepository from "../models/data/firebase_storage_repository";

const socket = io("https://tcbello-chatty-api.vercel.app").connect();

const useChatController = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [messageList, setMessageList] = useState<MessageEntity[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [chatRoom, setChatRoom] = useState<ChatRoomEntity | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>();
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [openedImage, setOpenedImage] = useState<string | null>(null);

  const toast = useToast();

  const chatViewModel = useChatViewModel();
  const messageViewModel = useMessageViewModel();
  const userViewModel = useUserViewModel();

  const _storageRepo = new DataFirebaseStorageRepository();

  function _sortMessages(messages: MessageEntity[]): MessageEntity[] {
    messages.sort((a, b) => {
      let timeB = new Date(b.createdAt).getTime();
      let timeA = new Date(a.createdAt).getTime();

      return timeB - timeA;
    });

    return messages;
  }

  async function sendMessage() {
    if (message) {
      const sender: SenderEntity = {
        id: userViewModel.user.id,
        username: userViewModel.user.username,
      };

      const messageEntity: MessageEntity = {
        id: "uuid()",
        chatRoomID: chatViewModel.data.id,
        sender: sender,
        text: message,
        type: MessageType.text,
        imageURL: "",
        createdAt: new Date(),
      };

      var result = await messageViewModel.sendMessageDispatch(messageEntity);

      if (result === DispatchStatus.fulfilled) {
        socket.emit("send-message", messageEntity);
        // setMessageList([...messageList, messageEntity]);
        onAddMessage(messageEntity);
        setMessage(null);
      } else {
        showErrorToast(toast, "Something went wrong");
      }
    } else {
      showErrorToast(toast, "Empty message");
    }
  }

  async function sendImageMessage() {
    if (file) {
      const sender: SenderEntity = {
        id: userViewModel.user.id,
        username: userViewModel.user.username,
      };

      const messageID = uuidv4();

      const url = await _storageRepo.uploadMessageImage(
        file,
        userViewModel.user.id
      );

      if (url) {
        const messageEntity: MessageEntity = {
          id: messageID,
          chatRoomID: chatViewModel.data.id,
          sender: sender,
          text: "",
          type: MessageType.image,
          imageURL: url,
          createdAt: new Date(),
        };

        var result = await messageViewModel.sendMessageDispatch(messageEntity);

        if (result === DispatchStatus.fulfilled) {
          socket.emit("send-message", messageEntity);
          onAddMessage(messageEntity);
          setFile(null);
          setPreviewImage(null);
        } else {
          showErrorToast(toast, "Something went wrong");
        }
      } else {
        showErrorToast(toast, "Error uploading image");
      }
    } else {
      showErrorToast(toast, "Empty message");
    }
  }

  async function getMessage(roomID: string) {
    var result = await messageViewModel.getMessageDispatch(roomID);

    if (result.meta.requestStatus === DispatchStatus.fulfilled) {
      let messages = (result.payload as any).data as MessageEntity[];
      let sortedMessages = _sortMessages([...messages]);

      setMessageList(sortedMessages);
    } else {
      showErrorToast(toast, "Unable to obtain messages");
    }
  }

  function onMessageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessage(e.target.value);
  }

  async function getChatRoom(userID: string, onStart: boolean) {
    var result = await chatViewModel.getChatDispatch(userID);
    const room = (result.payload as any).data as ChatRoomEntity;
    if (result.meta.requestStatus === DispatchStatus.fulfilled) {
      setChatRoom(room);
      await getMessage(room.id);
      socket.emit("join-room", room.id);
      // socket.on("receive-message", async (data) => {
      //   await getMessage();
      // });
    } else {
      if (!onStart) {
        showErrorToast(toast, "Unable to obtain chat room");
      }
    }
  }

  async function searchChatRoom() {
    setIsSearching(true);
    var result = await chatViewModel.searchChatDispatch(userViewModel.user.id);

    if (result.meta.requestStatus === DispatchStatus.fulfilled) {
      // await getMessage(chatViewModel.data.id);
      // socket.emit("join-room", chatViewModel.data.id);
      // setChatRoom(chatViewModel.data);
      // setIsSearching(false);
      // const room = result;
      // console.log(room);
      // socket.emit("join-room", room.id);
      // setChatRoom(room);
      await getChatRoom(userViewModel.user.id, false);
      setIsSearching(false);
    } else {
      setIsSearching(false);
      // showErrorToast(toast, result.errorMessage);
      showErrorToast(toast, result.payload as string);
    }
  }

  async function endChatRoom() {
    var result = await chatViewModel.endChatDispatch(userViewModel.user.id);

    if (result === DispatchStatus.fulfilled) {
      socket.emit("end-chat", chatRoom?.id);
      setChatRoom(null);
      setMessageList([] as MessageEntity[]);
    } else {
      showErrorToast(toast, "Something went wrong");
    }
  }

  function onCancelSearch() {
    setIsSearching(false);
  }

  function onEnterSendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") sendMessage();
  }

  function onAddMessage(newMessage: MessageEntity) {
    setMessageList((list) => _sortMessages([...list, newMessage]));
  }

  function onEndChatRoom() {
    setChatRoom(null);
    setMessageList([] as MessageEntity[]);
  }

  function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files;

    if (selectedFile!.length > 0) {
      setFile(selectedFile![0]);
      setPreviewImage(URL.createObjectURL(selectedFile![0]));
    }
  }

  function onRemoveFile() {
    setFile(null);
    setPreviewImage(null);
  }

  function onOpenImageViewer(image: string) {
    setIsImageViewerOpen(true);
    setOpenedImage(image);
  }

  function onCloseImageViewer() {
    setIsImageViewerOpen(false);
    setOpenedImage(null);
  }

  return {
    message,
    isSearching,
    chatRoom,
    chatViewModel,
    messageViewModel,
    userViewModel,
    socket,
    messageList,
    previewImage,
    isImageViewerOpen,
    openedImage,
    sendMessage,
    sendImageMessage,
    getMessage,
    onMessageChange,
    getChatRoom,
    searchChatRoom,
    endChatRoom,
    onCancelSearch,
    onEnterSendMessage,
    onAddMessage,
    onEndChatRoom,
    onChangeFile,
    onRemoveFile,
    onOpenImageViewer,
    onCloseImageViewer,
  };
};

export default useChatController;
