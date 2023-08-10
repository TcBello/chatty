import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./components/auth_provider";
import { UserProvider } from "./components/user_provider";
import { store } from "./redux/store";
import { AppRouter } from "./routes/app_router";
import { socket } from "./components/socket";

function App() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  // DEV MODE
  return (
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
  );

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
}

export default App;
