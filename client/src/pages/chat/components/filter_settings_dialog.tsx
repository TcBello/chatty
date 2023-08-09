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
  Divider,
  Center,
  HStack,
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { countries } from "../../../components/constants";
import { UserContext } from "../../../components/user_provider";
import { AppDispatch } from "../../../redux/store";
import useFilterSettingsController from "../../../view-controller/use_filter_settings_controller";

export const FilterSettingsDialog = (props: {
  onClose: () => void;
  isOpen: boolean;
  cancelRef: React.MutableRefObject<any>;
}) => {
  const {
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
  } = useFilterSettingsController();

  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext) initializeData(userContext.preferences);
  }, [userContext]);

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
              Filter Settings
            </Center>
            <Divider h={1} />
          </AlertDialogHeader>
          {/* CONTENT */}
          <AlertDialogBody>
            <VStack alignItems={"flex-start"} width={"full"}>
              {/* GENDER TEXT */}
              <Text className="filter-option-header">Gender</Text>
              {/* GENDER RADIO BUTTONS */}
              <RadioGroup onChange={onChangeGender} value={gender}>
                <HStack>
                  <Box className="filter-item-container">
                    <Radio value="any">Any</Radio>
                  </Box>
                  <Box className="filter-item-container">
                    <Radio value="male">Male</Radio>
                  </Box>
                  <Box className="filter-item-container">
                    <Radio value="female">Female</Radio>
                  </Box>
                </HStack>
              </RadioGroup>
              {/* COUNTRY */}
              <Text className="filter-option-header">Country</Text>
              <Select
                placeholder="Any"
                onChange={onChangeCountry}
                value={country ?? ""}
              >
                {countries.map((country, index) => {
                  return (
                    <option value={country} key={`country-${index}`}>
                      {country}
                    </option>
                  );
                })}
              </Select>
              {/* INTEREST */}
              <Text className="filter-option-header">Interest</Text>
              <Wrap direction={"row"}>
                {interests.map((interest, index) => {
                  return (
                    <Tag key={`interest-${index}`}>
                      <TagLabel padding={"10px 5px"}>{interest}</TagLabel>
                      <TagCloseButton onClick={() => removeInterest(index)} />
                    </Tag>
                  );
                })}
              </Wrap>
              <HStack width={"full"}>
                <Input
                  value={interestValue ?? ""}
                  placeholder="Enter your interest here"
                  flex={2}
                  onChange={onChangeInterestValue}
                  onKeyUp={onEnterAdd}
                />
                <button
                  className="filter-add-interest-button"
                  onClick={addInterest}
                >
                  Add
                </button>
              </HStack>
            </VStack>
          </AlertDialogBody>
          {/* ACTIONS */}
          <AlertDialogFooter>
            <button ref={props.cancelRef} onClick={props.onClose}>
              Cancel
            </button>
            <button
              className="login-forgot-submit-button"
              onClick={() =>
                userContext != null ? onSave(userContext?.id) : null
              }
            >
              Save
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
