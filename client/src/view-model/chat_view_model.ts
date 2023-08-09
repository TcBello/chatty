import { useDispatch, useSelector } from "react-redux";
import { DispatchStatus } from "../components/enums";
import DispatchStatusEntity from "../models/entities/dispatch_status_entity";
import { endChat, getChat, searchChat } from "../redux/slices/chat_slice";
import { AppDispatch, RootState } from "../redux/store";

const useChatViewModel = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, data } = useSelector(
    (state: RootState) => state.chatReducer
  );

  async function getChatDispatch(userID: string) {
    var result = await dispatch(getChat({ userID: userID }));

    return result;
  }

  async function searchChatDispatch(userID: string) {
    var result = await dispatch(searchChat({ userID: userID }));

    // const status: DispatchStatusEntity = {
    //   status: result.meta.requestStatus as DispatchStatus,
    //   errorMessage: result.payload as string,
    // };

    return result;
  }

  async function endChatDispatch(userID: string) {
    var result = await dispatch(endChat({ userID: userID }));

    return result.meta.requestStatus;
  }

  return {
    loading,
    data,
    getChatDispatch,
    searchChatDispatch,
    endChatDispatch,
  };
};

export default useChatViewModel;
