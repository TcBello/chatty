import { useDispatch, useSelector } from "react-redux";
import { PreferenceEntity } from "../models/entities/preference_entity";
import { UserEntity } from "../models/entities/user_entity";
import {
  getUserData,
  loginUser,
  savePreference,
  signupUser,
  updateAvatar,
  updateUsername,
} from "../redux/slices/user_slice";
import { AppDispatch, RootState } from "../redux/store";

const useUserViewModel = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, loading } = useSelector(
    (state: RootState) => state.userReducer
  );

  async function loginDispatch(email: string, password: string, toast: any) {
    await dispatch(
      loginUser({
        email: email,
        password: password,
        toast: toast,
      })
    );
  }

  async function signupDispatch(
    user: UserEntity,
    password: string,
    toast: any
  ) {
    await dispatch(
      signupUser({
        user: user,
        password: password,
        toast: toast,
      })
    );
  }

  function savePreferenceDispatch(
    userID: string,
    preference: PreferenceEntity,
    toast: any
  ) {
    dispatch(
      savePreference({
        userID: userID,
        preference: preference,
        toast: toast,
      })
    );
  }

  async function getUserDataDispatch(userID: string) {
    return await dispatch(getUserData({ userId: userID }));
  }

  async function updateAvatarDispatch(userID: string, file: File, toast: any) {
    var result = await dispatch(
      updateAvatar({
        userID: userID,
        file: file,
        toast: toast,
      })
    );

    return result.meta.requestStatus;
  }

  async function updateUsernameDispatch(
    userID: string,
    username: string,
    toast: any
  ) {
    var result = await dispatch(
      updateUsername({
        userID: userID,
        username: username,
        toast: toast,
      })
    );

    return result.meta.requestStatus;
  }

  return {
    user,
    loading,
    loginDispatch,
    signupDispatch,
    getUserDataDispatch,
    savePreferenceDispatch,
    updateAvatarDispatch,
    updateUsernameDispatch,
  };
};

export default useUserViewModel;
