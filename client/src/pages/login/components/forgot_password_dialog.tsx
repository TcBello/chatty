import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  VStack,
  Input,
  AlertDialogFooter,
  Box,
  Text,
  Divider,
} from "@chakra-ui/react";
import React from "react";
import useForgotPasswordController from "../../../view-controller/use_forgot_password_controller";

export const ForgotPasswordDialog = (props: {
  onClose: () => void;
  isOpen: boolean;
  cancelRef: React.MutableRefObject<any>;
}) => {
  const { email, onChangeEmail } = useForgotPasswordController();

  return (
    <AlertDialog
      onClose={props.onClose}
      isOpen={props.isOpen}
      isCentered
      leastDestructiveRef={props.cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          {/* HEADER */}
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Reset Your Password
            <Divider h={1} />
          </AlertDialogHeader>
          {/* CONTENT */}
          <AlertDialogBody>
            <VStack>
              <Text>Please enter your email to reset your password</Text>
              <Box height={0.5} />
              <Input placeholder="Email" size="lg" onChange={onChangeEmail} />
            </VStack>
          </AlertDialogBody>
          {/* ACTIONS */}
          <AlertDialogFooter>
            <button ref={props.cancelRef} onClick={props.onClose}>
              Cancel
            </button>
            <button
              className="login-forgot-submit-button"
              onClick={props.onClose}
            >
              Submit
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
