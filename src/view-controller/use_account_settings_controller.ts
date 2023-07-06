import { useState } from "react";

const useAccountSettingsController = () => {
  const [isEditMode, setEditMode] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("Sum Ting Wong");
  const [image, setImage] = useState(
    "https://www.ethnicityawards.com/wp-content/uploads/2021/07/OI-Sum-Ting-Wong-489x489.png"
  );

  function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files;

    if (selectedFile!.length > 0) {
      setFile(selectedFile![0]);
      setImage(URL.createObjectURL(selectedFile![0]));
    }
  }

  function onOpenEdit() {
    setEditMode(true);
  }

  function onCloseEdit() {
    setEditMode(false);
    setName("Sum Ting Wong");
  }

  function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  return {
    isEditMode,
    file,
    image,
    name,
    onChangeFile,
    onOpenEdit,
    onCloseEdit,
    onChangeName,
  };
};

export default useAccountSettingsController;
