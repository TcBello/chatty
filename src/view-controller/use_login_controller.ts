import { useState } from "react";

const useLoginController = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return {
    email,
    password,
    onChangeEmail,
    onChangePassword,
  };
};

export default useLoginController;
