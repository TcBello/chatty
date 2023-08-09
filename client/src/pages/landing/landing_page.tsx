import "./landing_page.css";
import {
  Box,
  Center,
  Container,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export const LandingPage = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const navigate = useNavigate();

  function onGetStarted() {
    navigate("/login");
  }

  if (isMobile) {
    return (
      <Container className="landing-container">
        {/* CHATTY TEXT */}
        <Text className="landing-chatty">Chatty</Text>
        <VStack justifyContent={"center"} height="xl">
          {/* CHATTY INFO */}
          <Text className="landing-info">
            With Chatty, meeting and getting to know people have been made
            easier. It's a space where conversation transcends borders, enabling
            individuals to discover, learn, and grow through the power of chat.
          </Text>
          <Box h={10} />
          {/* START CHATTING NOW BUTTON */}
          <button
            className="landing-start-chatting-button"
            onClick={onGetStarted}
          >
            Start Chatting Now!
          </button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container className="landing-container" maxWidth={"full"}>
      <HStack
        justifyContent="space-between"
        alignItems="center"
        height={110}
        padding="0px 16px"
      >
        {/* CHATTY TEXT */}
        <Text className="landing-chatty">Chatty</Text>
        {/* GET STARTED BUTTON */}
        <button className="landing-get-started-button" onClick={onGetStarted}>
          Get Started
        </button>
      </HStack>
      <VStack height="xl" justifyContent="center">
        {/* CHATTY INFO */}
        <Text className="landing-info">
          With Chatty, meeting and getting to know people have been made easier.
          It's a space where conversation transcends borders, enabling
          individuals to discover, learn, and grow through the power of chat.
        </Text>
        <Box h={10} />
        {/* START CHATTING NOW BUTTON */}
        <button
          className="landing-start-chatting-button"
          onClick={onGetStarted}
        >
          Start Chatting Now!
        </button>
      </VStack>
    </Container>
  );
};
