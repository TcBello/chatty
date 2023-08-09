import { useToast } from "@chakra-ui/react";

export function showSuccessToast(toast: any, message: String) {
  const id = "success-toast";

  if (!toast.isActive(id)) {
    toast({
      //   title: "Account created.",
      description: message,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }
}

export function showErrorToast(toast: any, message: String) {
  const id = "error-toast";

  if (!toast.isActive(id)) {
    toast({
      //   title: "Account created.",
      id,
      description: message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
}
