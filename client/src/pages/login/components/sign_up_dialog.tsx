import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  VStack,
  Input,
  AlertDialogFooter,
  Box,
  Text,
  Center,
  Divider,
  Flex,
  Select,
  RadioGroup,
  Radio,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { countries, days, months } from "../../../components/constants";
import useSignUpController from "../../../view-controller/use_sign_up_controller";

export const SignUpDialog = (props: {
  onClose: () => void;
  isOpen: boolean;
  cancelRef: React.MutableRefObject<any>;
}) => {
  const {
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
  } = useSignUpController();

  useEffect(() => {
    initYears();
  }, []);

  return (
    <AlertDialog
      onClose={props.onClose}
      isOpen={props.isOpen}
      isCentered
      leastDestructiveRef={props.cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          {/* HEADER */}
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            <Center fontSize={36} fontWeight="bold">
              Sign Up
            </Center>
            <Divider />
          </AlertDialogHeader>
          {/* CONTENT */}
          <AlertDialogBody>
            <VStack>
              <Flex direction={"row"} justifyContent="space-between">
                {/* FIRST NAME TEXT FIELD */}
                <Input
                  placeholder="First Name"
                  variant={"filled"}
                  size="lg"
                  onChange={onChangeFirstName}
                />
                <Box w={2} />
                {/* LAST NAME TEXT FIELD */}
                <Input
                  placeholder="Last Name"
                  variant={"filled"}
                  size="lg"
                  onChange={onChangeLastName}
                />
              </Flex>
              {/* USERNAME TEXT FIELD */}
              <Input
                placeholder="Username"
                variant={"filled"}
                size="lg"
                onChange={onChangeUsername}
              />
              {/* EMAIL TEXT FIELD */}
              <Input
                placeholder="Email"
                variant={"filled"}
                size="lg"
                onChange={onChangeEmail}
              />
              {/* PASSWORD TEXT FIELD */}
              <Input
                placeholder="Password"
                variant={"filled"}
                type={"password"}
                size="lg"
                onChange={onChangePassword}
              />
              {/* BIRTHDAY TEXT */}
              <Text fontWeight={"medium"} alignSelf="flex-start">
                Birthday
              </Text>
              <Flex direction={"row"} width="full">
                {/* MONTH DROPDOWN */}
                <Select placeholder="Month" onChange={onChangeMonth}>
                  {months.map((month, index) => {
                    return (
                      <option value={month} key={`month-${index}`}>
                        {month}
                      </option>
                    );
                  })}
                </Select>
                <Box w={5} />
                {/* DAY DROPDOWN */}
                <Select placeholder="Day" onChange={onChangeDay}>
                  {days.map((day, index) => {
                    return (
                      <option value={day} key={`day-${index}`}>
                        {day}
                      </option>
                    );
                  })}
                </Select>
                <Box w={5} />
                {/* YEAR DROPDOWN */}
                <Select placeholder="Year" onChange={onChangeYear}>
                  {years.map((year, index) => {
                    return (
                      <option value={year} key={`year-${index}`}>
                        {year}
                      </option>
                    );
                  })}
                </Select>
              </Flex>
              {/* GENDER TEXT */}
              <Text fontWeight={"medium"} alignSelf="flex-start">
                Gender
              </Text>
              {/* GENDER RADIO BUTTONS */}
              <RadioGroup
                onChange={onChangeGender}
                value={gender ?? ""}
                width="full"
              >
                <Flex direction={"row"} justifyContent={"flex-start"}>
                  <div className="sign-up-radio-button">
                    <Radio value="male">Male</Radio>
                  </div>
                  <Box w={2} />
                  <div className="sign-up-radio-button">
                    <Radio value="female">Female</Radio>
                  </div>
                </Flex>
              </RadioGroup>
              {/* COUNTRY DROPDOWN */}
              <Select placeholder="Country" onChange={onChangeCountry}>
                {countries.map((country, index) => {
                  return (
                    <option value={country} key={`country-${index}`}>
                      {country}
                    </option>
                  );
                })}
              </Select>
            </VStack>
          </AlertDialogBody>
          {/* ACTIONS */}
          <AlertDialogFooter>
            <button ref={props.cancelRef} onClick={props.onClose}>
              Cancel
            </button>
            <button className="login-forgot-submit-button" onClick={signup}>
              Submit
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
