import { useState, useEffect } from "react";
import { Card } from "antd";
import Router from "next/router";
import { Layout, Login, WithAuth } from "../components";
import * as baseApi from "../api/base";
import routes from "../routes";

const Index = props => {
  const { isLoggedIn } = props;
  const onSubmit = async (e, form) => {
    e.preventDefault();
    try {
      const response = await baseApi.login(form);
      const { success } = response.data;
      Router.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  if (isLoggedIn) {
    return (
      <Layout>
        <div>
          {Object.entries(routes).map(([key, route]) => {
            const { name, description } = route;
            if (key === "/") {
              return null;
            }
            return (
              <Card
                key={key}
                title={name}
                extra={<a href={key}>이동</a>}
                style={{ width: 300 }}
              >
                <p>{description}</p>
              </Card>
            );
          })}
        </div>
      </Layout>
    );
  }
  return <Login onSubmit={onSubmit} />;
};

export default WithAuth(Index, false);
