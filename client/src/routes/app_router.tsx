import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "../components/private_route";
import { AccountSettingsPage } from "../pages/account_settings/account_settings_page";
import { ChatPage } from "../pages/chat/chat_page";
import { LandingPage } from "../pages/landing/landing_page";
import { LoginPage } from "../pages/login/login_page";

export class AppRouter {
  static router = createBrowserRouter([
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
      element: <PrivateRoute component={<ChatPage />} />,
    },
    {
      path: "account-settings",
      element: <AccountSettingsPage />,
    },
  ]);
}
