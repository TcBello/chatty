import "./chat_page.css";
import {
  Container,
  VStack,
  Text,
  HStack,
  Avatar,
  Icon,
  Input,
  Box,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Image,
  CloseButton,
} from "@chakra-ui/react";
import {
  MdAddCircle,
  MdImage,
  MdLogout,
  MdManageAccounts,
  MdMic,
  MdSend,
} from "react-icons/md";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FilterSettingsDialog } from "./components/filter_settings_dialog";
import { useNavigate } from "react-router-dom";
import { MenuDrawer } from "./components/menu_drawer";
import { UserContext } from "../../components/user_provider";
import defaultAvatar from "../../assets/default_avatar.png";
import unknownAvatar from "../../assets/unknown_avatar.jpg";
import useUserViewModel from "../../view-model/use_user_view_model";
import { useDispatch } from "react-redux";
import useChatController from "../../view-controller/use_chat_controller";
import useChatViewModel from "../../view-model/chat_view_model";
import { AppDispatch } from "../../redux/store";
import { ChatRoomEntity } from "../../models/entities/chat_room_entity";
import { MessageEntity } from "../../models/entities/message_entity";
import formatTime from "../../components/formatted_time";
import AppColor from "../../components/colors";
import { MessageType } from "../../components/enums";
import ImageViewer from "react-simple-image-viewer";
import { useMediaQuery } from "react-responsive";

export const ChatPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawer = useDisclosure();
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const cancelRef = React.useRef<any>();
  const drawerRef = React.useRef<any>();
  const inputFile = useRef<HTMLInputElement | null>(null);

  const [avatar, setAvatar] = useState(defaultAvatar);
  const { getUserDataDispatch, user } = useUserViewModel();

  const dispatch = useDispatch<AppDispatch>();

  const {
    message,
    onMessageChange,
    searchChatRoom,
    isSearching,
    chatRoom,
    onCancelSearch,
    getChatRoom,
    endChatRoom,
    sendMessage,
    sendImageMessage,
    onEnterSendMessage,
    socket,
    messageList,
    getMessage,
    onAddMessage,
    onEndChatRoom,
    previewImage,
    onChangeFile,
    onRemoveFile,
    isImageViewerOpen,
    openedImage,
    onOpenImageViewer,
    onCloseImageViewer,
  } = useChatController();

  const featureActivated: boolean = messageList.length >= 15;

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useEffect(() => {
    if (userContext) {
      getUserDataDispatch(userContext.id);
      if (user) {
        if (user.image) setAvatar(user.image);
        getChatRoom(user.id);
      }
    }
  }, [userContext, dispatch]);

  useEffect(() => {
    socket.on("receive-message", (data: MessageEntity) => {
      onAddMessage(data);
    });
    socket.on("receive-end-chat", (data: string) => {
      onEndChatRoom();
    });
  }, [socket]);

  function test() {
    console.log(user);
  }

  const EmptyConversation = () => {
    return (
      <VStack flex={2} width={"full"} justifyContent="center">
        <Text className="chat-no-conversation-title">
          It seems you are not chatting
        </Text>
        <Text className="chat-no-conversation-title">
          Start a conversation now!
        </Text>
        <Box height={1} />
        <button className="chat-new-chat-button" onClick={searchChatRoom}>
          New Chat
        </button>
        <Box height={1} />
        <button className="chat-filter-button" onClick={onOpen}>
          Filter Settings
        </button>
        <button onClick={test}>TEST USER DATA CONTEXT</button>
      </VStack>
    );
  };

  const SearchingConversation = () => {
    return (
      <VStack
        flex={2}
        width={"full"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontWeight={"bold"} fontSize="32px">
          Searching...
        </Text>
        <button className="chat-cancel-search-button" onClick={onCancelSearch}>
          Cancel Search
        </button>
      </VStack>
    );
  };

  const Conversation = () => {
    return (
      <VStack
        width={"full"}
        // height="70vh"
        // maxHeight="max"
        overflowY={"auto"}
        justifyContent="flex-end"
        flex={2}
      >
        <div className="chat-messages-container">
          {messageList.map((message, index) => {
            const time = formatTime(message.createdAt);
            return (
              // MESSAGE
              <VStack
                alignItems={
                  message.sender.id === userContext!.id
                    ? "flex-end"
                    : "flex-start"
                }
                width="full"
                key={`message-${index}`}
                paddingRight={message.sender.id === userContext!.id ? 2 : 0}
              >
                <Box
                  className={
                    message.sender.id === userContext!.id
                      ? message.type === MessageType.text
                        ? "chat-current-user-message"
                        : "chat-current-user-message-image"
                      : message.type === MessageType.text
                      ? "chat-other-user-message"
                      : "chat-other-user-message-image"
                  }
                >
                  {/* TEXT */}
                  {/* <Text>{message.text ?? ""}</Text> */}

                  {message.type === MessageType.text ? (
                    <Text>{message.text ?? ""}</Text>
                  ) : (
                    <Image
                      src={message.imageURL!}
                      fit="cover"
                      maxH={"100%"}
                      maxW="100%"
                      onClick={() => onOpenImageViewer(message.imageURL!)}
                    />
                  )}
                </Box>
                {/* TIME STAMP */}
                <Text marginBottom={"10px"}>{time}</Text>
              </VStack>
            );
          })}
        </div>
      </VStack>
    );
  };

  return (
    <Container height="100vh" maxWidth="full">
      <VStack justifyContent={"flex-start"} height={"full"} width={"full"}>
        {/* NAVBAR */}
        <HStack justifyContent="space-between" width={"full"}>
          {/* CHATTY TEXT LOGO */}
          <button className="chatty-text-logo">Chatty</button>
          {/* AVATAR */}
          <Avatar src={avatar} size={"md"} onClick={drawer.onOpen} />
        </HStack>
        {chatRoom ? (
          // END CHAT BUTTON
          // <button className="chat-end-chat-button">End Chat</button>
          <HStack>
            {/* OTHER USER AVATAR */}
            {user.id !== chatRoom.participants[0].id ? (
              <Avatar
                name={chatRoom.participants[0].username}
                src={
                  featureActivated
                    ? chatRoom.participants[0].image ?? defaultAvatar
                    : unknownAvatar
                }
                height="80px"
                width="80px"
                marginRight={50}
              />
            ) : (
              <Avatar
                name={chatRoom.participants[1].username}
                src={
                  messageList.length >= 15
                    ? chatRoom.participants[1].image ?? defaultAvatar
                    : unknownAvatar
                }
                height="80px"
                width="80px"
                marginRight={50}
              />
            )}
            {/* // END CHAT BUTTON */}
            <button
              className={
                isMobile
                  ? "chat-end-chat-button-mobile"
                  : "chat-end-chat-button"
              }
              onClick={endChatRoom}
            >
              End Chat
            </button>
            {/* CURRENT USER AVATAR */}
            {user.id === chatRoom.participants[0].id ? (
              <Avatar
                name={chatRoom.participants[0].username}
                src={chatRoom.participants[0].image ?? defaultAvatar}
                height="80px"
                width="80px"
                marginLeft={50}
              />
            ) : (
              <Avatar
                name={chatRoom.participants[1].username}
                src={chatRoom.participants[1].image ?? defaultAvatar}
                height="80px"
                width="80px"
                marginLeft={50}
              />
            )}
          </HStack>
        ) : (
          <div></div>
        )}
        {/* {sampleData.length > 0 ? <Conversation /> : <EmptyConversation />} */}
        {isSearching ? (
          <SearchingConversation />
        ) : chatRoom ? (
          <Conversation />
        ) : (
          <EmptyConversation />
        )}
        {previewImage ? (
          <div className="chat-preview-image-container">
            <Image src={previewImage} fit="cover" maxH="100%" maxW="100%" />
            <CloseButton
              onClick={onRemoveFile}
              position="absolute"
              top={"0px"}
              right="0px"
              color={"white"}
              backgroundColor={AppColor.blue2}
            />
          </div>
        ) : (
          <div></div>
        )}
        {chatRoom ? (
          <HStack className="chat-message-container" width={"full"}>
            {/* ADD BUTTON */}
            <Popover placement="top">
              <PopoverTrigger>
                <button disabled={!featureActivated}>
                  <Icon
                    as={MdAddCircle}
                    height={"40px"}
                    width={"40px"}
                    color={featureActivated ? AppColor.blue : AppColor.grey}
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader fontWeight={"bold"}>
                  Add Attachment
                </PopoverHeader>
                <PopoverBody>
                  <VStack>
                    {/* IMAGE BUTTON */}
                    <Button
                      justifyContent={"flex-start"}
                      width="full"
                      leftIcon={
                        <Icon
                          as={MdImage}
                          height={"30px"}
                          width={"30px"}
                          marginRight={1}
                        />
                      }
                      variant={"ghost"}
                      onClick={() => inputFile?.current?.click()}
                    >
                      Image
                    </Button>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            {/* MESSAGE TEXT FIELD */}
            <Input
              placeholder="Message"
              variant={"filled"}
              size="lg"
              value={message ?? ""}
              onChange={onMessageChange}
              onKeyUp={(e) =>
                previewImage !== null && previewImage !== undefined
                  ? null
                  : onEnterSendMessage(e)
              }
              disabled={previewImage !== null && previewImage !== undefined}
            />
            {/* SEND BUTTON */}
            <Icon
              as={MdSend}
              height={"40px"}
              width={"40px"}
              color={
                message
                  ? AppColor.blue
                  : previewImage
                  ? AppColor.blue
                  : AppColor.grey
              }
              onClick={() =>
                message
                  ? sendMessage()
                  : previewImage
                  ? sendImageMessage()
                  : null
              }
            />
          </HStack>
        ) : (
          <div></div>
        )}
      </VStack>
      {/* FILTER SETTINGS POPUP */}
      <FilterSettingsDialog
        onClose={onClose}
        isOpen={isOpen}
        cancelRef={cancelRef}
      />
      {/* MENU DRAWER */}
      <MenuDrawer
        isOpen={drawer.isOpen}
        onClose={drawer.onClose}
        drawerRef={drawerRef}
      />
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        accept="image/png, image/gif, image/jpeg"
        onChange={onChangeFile}
      />
      {isImageViewerOpen && openedImage !== null ? (
        <ImageViewer
          src={[openedImage]}
          onClose={onCloseImageViewer}
          disableScroll={false}
          backgroundStyle={{
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
          closeOnClickOutside={true}
        />
      ) : (
        <div></div>
      )}
    </Container>
  );
};
