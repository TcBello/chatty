import { useState } from "react";

const useForgotPasswordController = () => {
  const [email, setEmail] = useState<string | null>(null);

  function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  return {
    email,
    onChangeEmail,
  };
};

export default useForgotPasswordController;
