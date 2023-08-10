import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { showErrorToast } from "../components/app_toast";
import DataFirebaseAuthRepository from "../models/data/firebase_auth_repository";

const useForgotPasswordController = () => {
  const [email, setEmail] = useState<string | null>(null);

  const toast = useToast();

  const _repo = new DataFirebaseAuthRepository();

  function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function onForgotPassword() {
    if (email) {
      await _repo.forgotPassword(email);
    } else {
      showErrorToast(toast, "Missing field");
    }
  }

  return {
    email,
    onChangeEmail,
    onForgotPassword,
  };
};

export default useForgotPasswordController;
