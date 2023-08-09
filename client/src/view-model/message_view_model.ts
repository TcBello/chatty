import { useDispatch, useSelector } from "react-redux";
import { MessageEntity } from "../models/entities/message_entity";
import { getMessage, sendMessage } from "../redux/slices/message_slice";
import { AppDispatch, RootState } from "../redux/store";

const useMessageViewModel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, data } = useSelector(
    (state: RootState) => state.messageReducer
  );

  async function getMessageDispatch(roomID: string) {
    var result = await dispatch(getMessage({ roomID: roomID }));

    return result;
  }

  async function sendMessageDispatch(message: MessageEntity) {
    var result = await dispatch(sendMessage({ message: message }));

    return result.meta.requestStatus;
  }

  return {
    loading,
    data,
    getMessageDispatch,
    sendMessageDispatch,
  };
};

export default useMessageViewModel;
