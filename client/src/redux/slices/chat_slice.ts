import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorToast } from "../../components/app_toast";
import { apiHost } from "../../components/constants";
import { ChatRoomEntity } from "../../models/entities/chat_room_entity";

const initialData = {
  loading: false,
  data: <ChatRoomEntity>{
    id: "",
    participants: [],
    isActive: false,
    createdAt: null,
  },
};

export const getChat = createAsyncThunk(
  "chat/get",
  async ({ userID }: { userID: string }, { rejectWithValue }) => {
    try {
      var result = await axios.post(`${apiHost}/chat`, { userID: userID });

      if (result.status === 200) {
        return {
          data: {
            id: result.data.data.id,
            participants: result.data.data.participants,
            isActive: result.data.data.isActive,
            createdAt: null,
          },
        };
      } else {
        return rejectWithValue(result.data.message);
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const searchChat = createAsyncThunk(
  "chat/search",
  async ({ userID }: { userID: string }, { rejectWithValue, dispatch }) => {
    try {
      var result = await axios.post(`${apiHost}/chat/search`, {
        currentUserID: userID,
      });

      if (result.status === 201) {
        await dispatch(getChat({ userID: userID }));
      } else if (result.status === 200) {
        return rejectWithValue(result.data.message);
      } else {
        return rejectWithValue(result.data.message);
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const endChat = createAsyncThunk(
  "chat/end",
  async ({ userID }: { userID: string }, { rejectWithValue, dispatch }) => {
    try {
      var result = await axios.post(`${apiHost}/chat/end`, {
        currentUserID: userID,
      });

      if (result.status === 200) {
        dispatch(getChat({ userID: userID }));
      } else {
        return rejectWithValue(result.data.message);
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: initialData,
  reducers: {},
  extraReducers(builder) {
    builder
      // GET CHAT
      .addCase(getChat.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        data: action.payload.data,
      }))
      .addCase(getChat.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(getChat.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
      // SEARCH CHAT
      .addCase(searchChat.fulfilled, (state, action) => ({
        ...state,
        loading: false,
      }))
      .addCase(searchChat.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(searchChat.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
      // END CHAT
      .addCase(endChat.fulfilled, (state, action) => ({
        ...state,
        loading: false,
      }))
      .addCase(endChat.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(endChat.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }));
  },
});

const chatReducer = chatSlice.reducer;

export default chatReducer;
