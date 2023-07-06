import "./account_settings_page.css";
import {
  Avatar,
  Box,
  Center,
  Container,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdEditSquare, MdPhotoCamera } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import useAccountSettingsController from "../../view-controller/use_account_settings_controller";

export const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const inputFile = useRef<HTMLInputElement | null>(null);
  const {
    isEditMode,
    file,
    image,
    name,
    onChangeFile,
    onOpenEdit,
    onCloseEdit,
    onChangeName,
  } = useAccountSettingsController();

  return (
    <Container height={"100vh"} maxWidth="full">
      {/* CHATTY TEXT LOGO */}
      <button className="chatty-text-logo" onClick={() => navigate(-1)}>
        Chatty
      </button>
      <Box h={10} />
      <VStack>
        <Box className="account-avatar-container">
          {/* AVATAR */}
          <Avatar src={image} size={"2xl"} />
          {/* CAMERA ICON */}
          <button
            className="account-camera-button"
            onClick={() => inputFile.current?.click()}
          >
            <Center>
              <Icon as={MdPhotoCamera} color="white" />
            </Center>
          </button>
        </Box>
        <HStack justifyContent={"center"} alignItems="center" padding={2}>
          {isEditMode ? (
            // NAME TEXT FIELD
            <Input
              placeholder="Name"
              value={name}
              size="lg"
              onChange={onChangeName}
            />
          ) : (
            // NAME TEXT
            <Text fontWeight={"bold"} fontSize="32px">
              Sum Ting Wong
            </Text>
          )}
          {isEditMode ? (
            <HStack>
              {/* CANCEL BUTTON */}
              <button
                className="account-cancel-edit-button"
                onClick={onCloseEdit}
              >
                Cancel
              </button>
              {/* SAVE BUTTON */}
              <button className="account-save-edit-button">Save</button>
            </HStack>
          ) : (
            // EDIT BUTTON
            <button onClick={onOpenEdit}>
              <Icon
                as={MdEditSquare}
                className="account-edit-icon"
                width={"30px"}
                height={"30px"}
                color="#14274E"
              />
            </button>
          )}
        </HStack>
      </VStack>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        accept="image/png, image/gif, image/jpeg"
        onChange={onChangeFile}
      />
    </Container>
  );
};
