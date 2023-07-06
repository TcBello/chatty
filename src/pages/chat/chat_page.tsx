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
} from "@chakra-ui/react";
import {
  MdAddCircle,
  MdImage,
  MdLogout,
  MdManageAccounts,
  MdMic,
  MdSend,
} from "react-icons/md";
import React from "react";
import { FilterSettingsDialog } from "./components/filter_settings_dialog";
import { useNavigate } from "react-router-dom";

interface MessageModel {
  text: string;
  isCurrentUser: boolean;
}

const sampleData: MessageModel[] = [
  // {
  //   text: "Hello",
  //   isCurrentUser: true,
  // },
  // {
  //   text: "Hi, how are you?",
  //   isCurrentUser: false,
  // },
];

// const EmptyConversation = () => {
//   return (
//     <VStack flex={2} width={"full"} justifyContent="center">
//       <Text className="chat-no-conversation-title">
//         It seems you are not chatting
//       </Text>
//       <Text className="chat-no-conversation-title">
//         Start a conversation now!
//       </Text>
//       <Box height={1} />
//       <button className="chat-new-chat-button">New Chat</button>
//       <Box height={1} />
//       <button className="chat-filter-button" onClick={onOpen}>Filter Settings</button>
//     </VStack>
//   );
// };

// const Conversation = () => {
//   return (
//     <VStack flex={2} width={"full"} justifyContent="flex-end">
//       {sampleData.map((message, index) => {
//         return (
//           // MESSAGE
//           <Box
//             className={
//               message.isCurrentUser
//                 ? "chat-current-user-message"
//                 : "chat-other-user-message"
//             }
//             key={`message-${index}`}
//           >
//             {message.text}
//           </Box>
//         );
//       })}
//     </VStack>
//   );
// };

export const ChatPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const drawer = useDisclosure();
  const navigate = useNavigate();

  const cancelRef = React.useRef<any>();
  const drawerRef = React.useRef<any>();

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
        <button className="chat-new-chat-button">New Chat</button>
        <Box height={1} />
        <button className="chat-filter-button" onClick={onOpen}>
          Filter Settings
        </button>
      </VStack>
    );
  };

  const Conversation = () => {
    return (
      <VStack flex={2} width={"full"} justifyContent="flex-end">
        {sampleData.map((message, index) => {
          return (
            // MESSAGE
            <Box
              className={
                message.isCurrentUser
                  ? "chat-current-user-message"
                  : "chat-other-user-message"
              }
              key={`message-${index}`}
            >
              {message.text}
            </Box>
          );
        })}
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
          <Avatar
            src="https://www.ethnicityawards.com/wp-content/uploads/2021/07/OI-Sum-Ting-Wong-489x489.png"
            size={"md"}
            onClick={drawer.onOpen}
          />
        </HStack>
        {sampleData.length > 0 ? (
          // END CHAT BUTTON
          <button className="chat-end-chat-button">End Chat</button>
        ) : (
          <div></div>
        )}
        {sampleData.length > 0 ? <Conversation /> : <EmptyConversation />}
        <HStack className="chat-message-container" width={"full"}>
          {/* ADD BUTTON */}
          <Popover placement="top">
            <PopoverTrigger>
              <button>
                <Icon
                  as={MdAddCircle}
                  height={"40px"}
                  width={"40px"}
                  color="#14274E"
                />
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader fontWeight={"bold"}>Add Attachment</PopoverHeader>
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
                    // onClick={() => navigate("/account-settings")}
                  >
                    Image
                  </Button>
                  {/* VOICE BUTTON */}
                  <Button
                    justifyContent={"flex-start"}
                    width="full"
                    leftIcon={
                      <Icon
                        as={MdMic}
                        height={"30px"}
                        width={"30px"}
                        marginRight={1}
                      />
                    }
                    variant={"ghost"}
                    // onClick={() => navigate("/account-settings")}
                  >
                    Voice clip
                  </Button>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          {/* MESSAGE TEXT FIELD */}
          <Input placeholder="Message" variant={"filled"} size="lg" />
          {/* SEND BUTTON */}
          <Icon as={MdSend} height={"40px"} width={"40px"} color="#14274E" />
        </HStack>
      </VStack>
      {/* FILTER SETTINGS POPUP */}
      <FilterSettingsDialog
        onClose={onClose}
        isOpen={isOpen}
        cancelRef={cancelRef}
      />
      {/* MENU DRAWER */}
      <Drawer
        isOpen={drawer.isOpen}
        placement="right"
        onClose={drawer.onClose}
        finalFocusRef={drawerRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody>
              <VStack>
                {/* AVATAR */}
                <Avatar
                  src="https://www.ethnicityawards.com/wp-content/uploads/2021/07/OI-Sum-Ting-Wong-489x489.png"
                  size={"xl"}
                />
                {/* USER'S NAME */}
                <Text className="chat-menu-name">Sum Ting Wong</Text>
                <Box h={5} />
                <HStack width="full">
                  {/* ACCOUNT SETTINGS BUTTON */}
                  <Button
                    justifyContent={"flex-start"}
                    width="full"
                    leftIcon={
                      <Icon
                        as={MdManageAccounts}
                        height={"30px"}
                        width={"30px"}
                        marginRight={1}
                      />
                    }
                    variant={"ghost"}
                    onClick={() => navigate("/account-settings")}
                  >
                    Account Settings
                  </Button>
                </HStack>
                <HStack width="full">
                  {/* LOGOUT BUTTON */}
                  <Button
                    justifyContent={"flex-start"}
                    width="full"
                    leftIcon={
                      <Icon
                        as={MdLogout}
                        height={"30px"}
                        width={"30px"}
                        marginRight={1}
                      />
                    }
                    variant={"ghost"}
                  >
                    Logout
                  </Button>
                </HStack>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Container>
  );
};
