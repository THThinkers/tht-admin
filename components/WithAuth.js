import Router from "next/router";
import { profile } from "../api/base";

// 감싼 Component의 getInitialProps와 현재 로그인 검증하는 profile을 합쳐서 실행 해주는 hoc

const WithAuth = (Comp, redirect = true) => {
  const Wrapper = props => <Comp {...props} />;
  Wrapper.getInitialProps = async (...args) => {
    try {
      const ctx = args[0];
      const cookie = ctx.req && ctx.req.headers ? ctx.req.headers.cookie : "";
      const option = { headers: { ...(cookie ? { cookie } : {}) } };
      const response = await profile(option);
      const { admin } = response.data;
      if (!admin && redirect) {
        Router.router ? Router.push("/") : ctx.res.redirect("/");
        return {
          isLoggedIn: false
        };
      }
      const CompGetInit = Comp.getInitialProps;
      if (!CompGetInit) {
        return { payload: {}, isLoggedIn: !!admin };
      }
      const payload = await CompGetInit(...args);
      return { payload, isLoggedIn: !!admin };
    } catch (err) {
      console.error(err);
      return { payload: {}, isLoggedIn: false };
    }
  };

  return Wrapper;
};

export default WithAuth;
