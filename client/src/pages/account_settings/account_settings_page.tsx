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
import { useContext, useEffect, useRef, useState } from "react";
import useAccountSettingsController from "../../view-controller/use_account_settings_controller";
import { UserContext } from "../../components/user_provider";
import useUserViewModel from "../../view-model/use_user_view_model";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

export const AccountSettingsPage = () => {
  const navigate = useNavigate();
  const inputFile = useRef<HTMLInputElement | null>(null);
  const userContext = useContext(UserContext);
  const {
    isEditModeName,
    file,
    image,
    name,
    editName,
    editImage,
    onChangeFile,
    onOpenEditName,
    onCloseEditName,
    onChangeName,
    onInitData,
    onCancelEditImage,
    onSaveEditImage,
    onSaveName,
  } = useAccountSettingsController();

  const { getUserDataDispatch, user } = useUserViewModel();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userContext) {
      getUserDataDispatch(userContext.id);
      onInitData(user.image, user.username, user.id);
    }
  }, [userContext, dispatch]);

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
          <Avatar src={editImage ?? image} size={"2xl"} />
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
        {editImage != null ? (
          <HStack>
            {/* CANCEL BUTTON */}
            <button
              className="account-cancel-edit-button"
              onClick={onCancelEditImage}
            >
              Cancel
            </button>
            {/* SAVE BUTTON */}
            <button
              className="account-save-edit-button"
              onClick={onSaveEditImage}
            >
              Save
            </button>
          </HStack>
        ) : (
          <div></div>
        )}
        <HStack justifyContent={"center"} alignItems="center" padding={2}>
          {isEditModeName ? (
            // NAME TEXT FIELD
            <Input
              placeholder="Name"
              value={editName}
              size="lg"
              onChange={onChangeName}
            />
          ) : (
            // NAME TEXT
            <Text fontWeight={"bold"} fontSize="32px">
              {name}
            </Text>
          )}
          {isEditModeName ? (
            <HStack>
              {/* CANCEL BUTTON */}
              <button
                className="account-cancel-edit-button"
                onClick={onCloseEditName}
              >
                Cancel
              </button>
              {/* SAVE BUTTON */}
              <button className="account-save-edit-button" onClick={onSaveName}>
                Save
              </button>
            </HStack>
          ) : (
            // EDIT BUTTON
            <button onClick={onOpenEditName}>
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
