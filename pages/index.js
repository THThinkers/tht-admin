import { useState } from "react";
import { Layout, Login } from "../components";
import * as baseApi from "../api/base";

const Index = props => {
  const [loginState, setLoginState] = useState(props.isLoggedIn);
  const onSubmit = async (e, form) => {
    e.preventDefault();
    try {
      const response = await baseApi.login(form);
      const { success } = response.data;
      setLoginState(success);
    } catch (err) {
      console.error(err);
    }
  };
  if (loginState) {
    return <Layout />;
  }
  return <Login onSubmit={onSubmit} />;
};

export default Index;
