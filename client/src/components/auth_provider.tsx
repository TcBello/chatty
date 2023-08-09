import { Center, Spinner } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase_setup";
import useUserViewModel from "../view-model/use_user_view_model";
import AppColor from "./colors";

export const AuthContext = createContext<User | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isPending, setIsPending] = useState(true);

  const { getUserDataDispatch } = useUserViewModel();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) getUserDataDispatch(user.uid);
      setIsPending(false);
    });
  }, []);

  if (isPending) {
    return (
      <Center height={"100vh"} justifyContent={"center"}>
        <Spinner size={"xl"} color={AppColor.blue2} thickness="4px" />
      </Center>
    );
  }

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
