import Link from "next/link";
import { Card, Row, Col } from "antd";
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
          <Row>
            {Object.entries(routes).map(([key, route]) => {
              const { name, description, onBoard } = route;
              if (!onBoard) {
                return null;
              }
              return (
                <Col span={8} key={key}>
                  <Card
                    title={name}
                    extra={
                      <Link href={key}>
                        <a>이동</a>
                      </Link>
                    }
                    style={{ width: 300, margin: 20 }}
                  >
                    <p>{description}</p>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Layout>
    );
  }
  return <Login onSubmit={onSubmit} />;
};

export default WithAuth(Index, false);
