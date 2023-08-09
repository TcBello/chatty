import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { showErrorToast } from "../components/app_toast";
import useUserViewModel from "../view-model/use_user_view_model";

const useLoginController = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const toast = useToast();
  const { loginDispatch } = useUserViewModel();

  function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function login() {
    if (email != null && password != null) {
      loginDispatch(email, password, toast);
    } else {
      showErrorToast(toast, "Missing fields");
    }
  }

  function onEnterLogin(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") login();
  }

  return {
    email,
    password,
    onChangeEmail,
    onChangePassword,
    login,
    onEnterLogin,
  };
};

export default useLoginController;
