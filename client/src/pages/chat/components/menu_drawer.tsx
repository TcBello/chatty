import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  VStack,
  Avatar,
  HStack,
  Button,
  Icon,
  Box,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { MdManageAccounts, MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../components/user_provider";
import DataFirebaseAuthRepository from "../../../models/data/firebase_auth_repository";
import defaultAvatar from "../../../assets/default_avatar.png";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import useUserViewModel from "../../../view-model/use_user_view_model";

export const MenuDrawer = (props: {
  isOpen: boolean;
  onClose: () => void;
  drawerRef: any;
}) => {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(defaultAvatar);
  const [username, setUsername] = useState("");
  const userContext = useContext(UserContext);

  const dispatch = useDispatch<AppDispatch>();

  const { getUserDataDispatch, user } = useUserViewModel();

  useEffect(() => {
    if (userContext) {
      getUserDataDispatch(userContext.id);
      if (user.image) setAvatar(user.image);
      setUsername(user.username);
    }
  }, [userContext, dispatch]);

  function logout() {
    const authRepo = new DataFirebaseAuthRepository();
    authRepo.logout().then((value) => navigate("/login", { replace: true }));
  }

  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onClose}
      finalFocusRef={props.drawerRef}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerHeader>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody>
            <VStack>
              {/* AVATAR */}
              <Avatar src={avatar} size={"xl"} />
              {/* USER'S NAME */}
              <Text className="chat-menu-name">{username}</Text>
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
                  onClick={logout}
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
  );
};
