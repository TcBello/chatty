import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage } from "./pages/landing/landing_page";
import { LoginPage } from "./pages/login/login_page";
import { ChakraProvider } from "@chakra-ui/react";
import { ChatPage } from "./pages/chat/chat_page";
import { AccountSettingsPage } from "./pages/account_settings/account_settings_page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "chat",
    element: <ChatPage />,
  },
  {
    path: "account-settings",
    element: <AccountSettingsPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
