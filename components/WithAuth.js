import { useState } from "react";
import AuthContext from "../utils/authContext";

const WithAuth = ({ children, isLoggedIn = false }) => {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default WithAuth;
