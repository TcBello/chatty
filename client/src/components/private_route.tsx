import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth_provider";

const PrivateRoute = (props: { component: JSX.Element }) => {
  const currentUser = useContext(AuthContext);

  if (currentUser) {
    return props.component;
  } else {
    return <Navigate to={"/login"} replace={true} />;
  }
};

export default PrivateRoute;
