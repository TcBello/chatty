import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { PreferenceEntity } from "../models/entities/preference_entity";
import useUserViewModel from "../view-model/use_user_view_model";

const useFilterSettingsController = () => {
  const [gender, setGender] = useState("any");
  const [interestValue, setInterestValue] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [country, setCountry] = useState<string | null>(null);

  const toast = useToast();
  const { savePreferenceDispatch } = useUserViewModel();

  function removeInterest(index: number) {
    let newInterests = [...interests];
    newInterests.splice(index, 1);
    setInterests(newInterests);
  }

  function addInterest() {
    if (interestValue) {
      setInterests([...interests, interestValue]);
      setInterestValue(null);
    }
  }

  function onChangeGender(value: string) {
    setGender(value);
  }

  function onChangeInterestValue(e: React.ChangeEvent<HTMLInputElement>) {
    setInterestValue(e.target.value);
  }

  function onChangeCountry(e: React.ChangeEvent<HTMLSelectElement>) {
    setCountry(e.target.value);
  }

  function onEnterAdd(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") addInterest();
  }

  function initializeData(preference: PreferenceEntity) {
    setGender(preference.gender);
    setCountry(preference.country);
    setInterests(preference.interests);
  }

  function onSave(userID: string) {
    const preference: PreferenceEntity = {
      gender: gender,
      country: country ?? "",
      interests: interests,
    };

    savePreferenceDispatch(userID, preference, toast);
  }

  return {
    gender,
    interestValue,
    interests,
    country,
    removeInterest,
    addInterest,
    onChangeGender,
    onChangeInterestValue,
    onChangeCountry,
    onEnterAdd,
    initializeData,
    onSave,
  };
};

export default useFilterSettingsController;
