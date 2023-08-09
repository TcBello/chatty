import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiHost } from "../../components/constants";
import { MessageEntity } from "../../models/entities/message_entity";

const initialState = {
  loading: false,
  data: [] as MessageEntity[],
};

export const getMessage = createAsyncThunk(
  "message/get",
  async ({ roomID }: { roomID: string }, { rejectWithValue }) => {
    try {
      var result = await axios.get(`${apiHost}/message/${roomID}`);

      if (result.status === 200) {
        return {
          data: result.data.data,
        };
      } else {
        return rejectWithValue(result.data.message);
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "message/send",
  async (
    { message }: { message: MessageEntity },
    { rejectWithValue, dispatch }
  ) => {
    try {
      var result = await axios.post(`${apiHost}/message`, message);

      if (result.status === 200) {
        dispatch(
          getMessage({
            roomID: message.chatRoomID,
          })
        );
      } else {
        rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // GET MESSAGE
      .addCase(getMessage.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        data: action.payload.data,
      }))
      .addCase(getMessage.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(getMessage.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
      // SEND MESSAGE
      .addCase(sendMessage.fulfilled, (state, action) => ({
        ...state,
        loading: false,
      }))
      .addCase(sendMessage.pending, (state, action) => ({
        ...state,
        loading: true,
      }))
      .addCase(sendMessage.rejected, (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }));
  },
});

const messageReducer = messageSlice.reducer;

export default messageReducer;
