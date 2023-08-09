import "./login_page.css";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Divider,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useContext, useEffect } from "react";
import { ForgotPasswordDialog } from "./components/forgot_password_dialog";
import { SignUpDialog } from "./components/sign_up_dialog";
import { Navigate, useNavigate } from "react-router-dom";
import useLoginController from "../../view-controller/use_login_controller";
import { AuthContext } from "../../components/auth_provider";

export const LoginPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const signupDialog = useDisclosure();
  const cancelRef = React.useRef<any>();

  const currentUser = useContext(AuthContext);

  const {
    email,
    password,
    onChangeEmail,
    onChangePassword,
    login,
    onEnterLogin,
  } = useLoginController();

  if (currentUser) {
    return <Navigate to={"/chat"} replace />;
  }

  return (
    <Container className="login-container" maxW={"full"}>
      <VStack justifyContent={"center"} height={"full"}>
        {/* TITLE 1 */}
        <Text className="login-title">Chatty</Text>
        {/* TITLE 2 */}
        <Text className="login-title2">Meet and get to know new people</Text>
        <Box height={1} />
        <Card
          width="container.sm"
          minWidth={"xs"}
          padding="5"
          boxShadow={"2xl"}
        >
          <CardBody>
            <VStack>
              {/* EMAIL TEXT FIELD */}
              <Input placeholder="Email" size="lg" onChange={onChangeEmail} />
              {/* PASSWORD TEXT FIELD */}
              <Input
                placeholder="Password"
                type="password"
                size="lg"
                onChange={onChangePassword}
                onKeyUp={onEnterLogin}
              />
              <Box height={5} />
              {/* LOGIN BUTTON */}
              <button className="login-button" onClick={login}>
                Log In
              </button>
              {/* FORGOT BUTTON */}
              <motion.button
                className="login-forgot-button"
                whileHover={{ textDecoration: "underline" }}
                onClick={onOpen}
              >
                Forgot password?
              </motion.button>
              <Box height={1} />
              <Divider />
              <Box height={1} />
              {/* SIGN UP BUTTON */}
              <button
                className="login-sign-up-button"
                onClick={signupDialog.onOpen}
              >
                Sign Up
              </button>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
      {/* FORGOT PASSWORD POP UP */}
      <ForgotPasswordDialog
        onClose={onClose}
        isOpen={isOpen}
        cancelRef={cancelRef}
      />
      {/* SIGN UP POP UP */}
      <SignUpDialog
        onClose={signupDialog.onClose}
        isOpen={signupDialog.isOpen}
        cancelRef={cancelRef}
      />
    </Container>
  );
};
