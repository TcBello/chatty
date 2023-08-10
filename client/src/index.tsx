import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AppRouter } from "./routes/app_router";
import { AuthProvider } from "./components/auth_provider";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { UserProvider } from "./components/user_provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // DEV MODE
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <AuthProvider>
          <UserProvider>
            <RouterProvider router={AppRouter.router} />
          </UserProvider>
        </AuthProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>

  // PROD MODE
  // <ChakraProvider>
  //   <Provider store={store}>
  //     <AuthProvider>
  //       <UserProvider>
  //         <RouterProvider router={AppRouter.router} />
  //       </UserProvider>
  //     </AuthProvider>
  //   </Provider>
  // </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
