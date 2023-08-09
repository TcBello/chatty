import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { showErrorToast } from "../components/app_toast";
import { ChattingState } from "../components/enums";
import { PreferenceEntity } from "../models/entities/preference_entity";
import { UserEntity } from "../models/entities/user_entity";
import useUserViewModel from "../view-model/use_user_view_model";

const useSignUpController = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [month, setMonth] = useState<string | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);

  const toast = useToast();

  const { signupDispatch } = useUserViewModel();

  function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function onChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function onChangeFirstName(e: React.ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
  }

  function onChangeLastName(e: React.ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
  }

  function onChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function onChangeGender(value: string) {
    setGender(value);
  }

  function onChangeMonth(e: React.ChangeEvent<HTMLSelectElement>) {
    setMonth(e.target.value);
  }

  function onChangeDay(e: React.ChangeEvent<HTMLSelectElement>) {
    setDay(e.target.value);
  }

  function onChangeYear(e: React.ChangeEvent<HTMLSelectElement>) {
    setYear(e.target.value);
  }

  function onChangeCountry(e: React.ChangeEvent<HTMLSelectElement>) {
    setCountry(e.target.value);
  }

  function initYears() {
    let year = new Date();
    let newYears = [];
    for (var i = year.getFullYear(); i >= 1980; i--) {
      newYears.push(i);
    }
    setYears(newYears);
  }

  function signup() {
    const preferences: PreferenceEntity = {
      gender: "any",
      country: "",
      interests: [],
    };

    if (
      firstName != null &&
      lastName != null &&
      username != null &&
      email != null &&
      gender != null &&
      country != null &&
      password != null &&
      month != null &&
      day != null &&
      year != null
    ) {
      const user: UserEntity = {
        id: "",
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        birthday: `${month} ${day} ${year}`,
        gender: gender,
        country: country,
        image: null,
        chattingState: ChattingState.idle,
        preferences: preferences,
        createdAt: new Date(),
      };

      signupDispatch(user, password, toast);
    } else {
      showErrorToast(toast, "Missing fields");
    }
  }

  return {
    email,
    password,
    firstName,
    lastName,
    username,
    gender,
    years,
    month,
    day,
    year,
    country,
    onChangeEmail,
    onChangePassword,
    onChangeFirstName,
    onChangeLastName,
    onChangeUsername,
    onChangeGender,
    onChangeMonth,
    onChangeDay,
    onChangeYear,
    onChangeCountry,
    initYears,
    signup,
  };
};

export default useSignUpController;
