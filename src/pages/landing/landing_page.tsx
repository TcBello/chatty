import './landing_page.css';
import { Center, Container, Link, Text, VStack } from "@chakra-ui/react"
import { Link as ReactRouterLink } from "react-router-dom";

export const LandingPage = () => {
    return <Container height="100vh" maxWidth="full">
        <VStack justifyContent="center" height={"full"}>
            <Text fontWeight={"bold"}>This is Landing Page</Text>
            <Link as={ReactRouterLink} to={"/login"}>
                Go To Login Page
            </Link>
        </VStack>
    </Container>;
}