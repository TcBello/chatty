import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import defaultAvatar from "../assets/default_avatar.png";
import { showErrorToast } from "../components/app_toast";
import { DispatchStatus } from "../components/enums";
import useUserViewModel from "../view-model/use_user_view_model";

const useAccountSettingsController = () => {
  const [isEditModeName, setEditModeName] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState("");
  const [image, setImage] = useState(defaultAvatar);
  const [editImage, setEditImage] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);

  const toast = useToast();

  const { updateAvatarDispatch, updateUsernameDispatch } = useUserViewModel();

  function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files;

    if (selectedFile!.length > 0) {
      setFile(selectedFile![0]);
      setEditImage(URL.createObjectURL(selectedFile![0]));
    }
  }

  function onOpenEditName() {
    setEditModeName(true);
  }

  function onCloseEditName() {
    setEditModeName(false);
    setEditName(name);
  }

  async function onSaveName() {
    if (userID) {
      if (editName.length > 0) {
        var result = await updateUsernameDispatch(userID, editName, toast);

        if (result === DispatchStatus.fulfilled) setName(editName);
      } else {
        showErrorToast(toast, "Missing Field");
      }
    }
    setEditModeName(false);
  }

  function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setEditName(e.target.value);
  }

  function onCancelEditImage() {
    setEditImage(null);
  }

  async function onSaveEditImage() {
    if (userID && file && editImage) {
      var result = await updateAvatarDispatch(userID, file, toast);
      if (result === DispatchStatus.fulfilled) setImage(editImage);
    }
    setEditImage(null);
  }

  function onInitData(image: string | null, username: string, id: string) {
    if (image) setImage(image);
    setName(username);
    setEditName(username);
    setUserID(id);
  }

  return {
    isEditModeName,
    file,
    image,
    name,
    editName,
    editImage,
    onChangeFile,
    onOpenEditName,
    onCloseEditName,
    onChangeName,
    onInitData,
    onCancelEditImage,
    onSaveEditImage,
    onSaveName,
  };
};

export default useAccountSettingsController;
