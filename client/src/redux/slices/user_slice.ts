import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../components/app_toast";
import { apiHost } from "../../components/constants";
import DataFirebaseAuthRepository from "../../models/data/firebase_auth_repository";
import DataFirebaseStorageRepository from "../../models/data/firebase_storage_repository";
import { PreferenceEntity } from "../../models/entities/preference_entity";
import { UserEntity } from "../../models/entities/user_entity";

const initialState = {
  loading: false,
  user: <UserEntity>{},
};

const repo = new DataFirebaseAuthRepository();
const storageRepo = new DataFirebaseStorageRepository();

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (props: { userId: string }, { rejectWithValue }) => {
    try {
      const result = await repo.getUserData(props.userId);
      if (result) {
        return {
          user: result,
        };
      } else {
        return rejectWithValue("No user");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { email, password, toast }: { email: string; password: string; toast: any },
    { rejectWithValue }
  ) => {
    try {
      const result = await repo.login(email, password);

      if (result) {
        return {
          user: result,
        };
      } else {
        return rejectWithValue("No user");
      }
    } catch (error) {
      showErrorToast(toast, (error as Error).message);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const signupUser = createAsyncThunk(
  "user/signup",
  async (
    props: { user: UserEntity; password: string; toast: any },
    { rejectWithValue }
  ) => {
    try {
      const result = await repo.signup(props.user, props.password);

      if (result) {
        return {
          user: result,
        };
      } else {
        showErrorToast(props.toast, "Unable to sign up");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const savePreference = createAsyncThunk(
  "user/save-preference",
  async (
    {
      userID,
      preference,
      toast,
    }: { userID: string; preference: PreferenceEntity; toast: any },
    { rejectWithValue, dispatch }
  ) => {
    try {
      var result = await axios.put(
        `${apiHost}/user/${userID}/preference`,
        preference
      );

      if (result.status === 200) {
        showSuccessToast(toast, "Preference saved");
        dispatch(getUserData({ userId: userID }));
      } else {
        showErrorToast(toast, "Something went wrong");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  "user/update-avatar",
  async (
    { userID, file, toast }: { userID: string; file: File; toast: any },
    { rejectWithValue, dispatch }
  ) => {
    try {
      var imageURL = await storageRepo.uploadImage(file, userID);
      var result = await axios.put(`${apiHost}/user/${userID}/avatar`, {
        avatar: imageURL,
      });

      if (result.status === 200) {
        dispatch(getUserData({ userId: userID }));
        showSuccessToast(toast, result.data.message);
      } else {
        showErrorToast(toast, result.data.message);
        return rejectWithValue(result.data.message);
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateUsername = createAsyncThunk(
  "user/update-username",
  async (
    {
      userID,
      username,
      toast,
    }: { userID: string; username: string; toast: any },
    { rejectWithValue, dispatch }
  ) => {
    try {
      var result = await axios.put(`${apiHost}/user/${userID}/username`, {
        username: username,
      });

      if (result.status === 200) {
        dispatch(getUserData({ userId: userID }));
        showSuccessToast(toast, result.data.message);
      } else {
        showErrorToast(toast, result.data.message);
        return rejectWithValue(result.data.message);
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // GET USER DATA
      .addCase(getUserData.fulfilled, (state, action) => ({
        ...state,
        user: action.payload!.user,
        loading: false,
      }))
      .addCase(getUserData.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(getUserData.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
      // LOGIN USER
      .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload!.user,
        loading: false,
      }))
      .addCase(loginUser.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
      // SIGNUP USER
      .addCase(signupUser.fulfilled, (state, action) => ({
        ...state,
        user: action.payload!.user,
        loading: false,
      }))
      .addCase(signupUser.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(signupUser.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
      // SAVE PREFERENCE
      .addCase(savePreference.fulfilled, (state, action) => ({
        ...state,
        loading: false,
      }))
      .addCase(savePreference.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(savePreference.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
      // UPDATE AVATAR
      .addCase(updateAvatar.fulfilled, (state, action) => ({
        ...state,
        loading: false,
      }))
      .addCase(updateAvatar.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(updateAvatar.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
      // UPDATE USERNAME
      .addCase(updateUsername.fulfilled, (state, action) => ({
        ...state,
        loading: false,
      }))
      .addCase(updateUsername.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(updateUsername.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }));
  },
});

const userReducer = userSlice.reducer;

export default userReducer;
