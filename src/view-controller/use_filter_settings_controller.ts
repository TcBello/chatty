import { useState } from "react";

const useFilterSettingsController = () => {
  const [gender, setGender] = useState("any");
  const [interestValue, setInterestValue] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [country, setCountry] = useState<string | null>(null);

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
  };
};

export default useFilterSettingsController;
