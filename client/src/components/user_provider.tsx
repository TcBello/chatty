import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserEntity } from "../models/entities/user_entity";
import { AppDispatch } from "../redux/store";
import useUserViewModel from "../view-model/use_user_view_model";
import { AuthContext } from "./auth_provider";

export const UserContext = createContext<UserEntity | null>(null);

export const UserProvider = (props: { children: any }) => {
  const [currentUser, setCurrentUser] = useState<UserEntity | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const authContext = useContext(AuthContext);

  const { getUserDataDispatch } = useUserViewModel();

  useEffect(() => {
    if (authContext) {
      getUserDataDispatch(authContext.uid).then((value) => {
        setCurrentUser((value.payload as any).user);
      });
    }
  }, [dispatch, authContext?.uid]);

  return (
    <UserContext.Provider value={currentUser}>
      {props.children}
    </UserContext.Provider>
  );
};
