import { Layout, Menu, Button, message } from "antd";
import Link from "next/link";
import Router from "next/router";
import routes from "../routes";
import { logout } from "../api/base";

const { Header, Content, Footer } = Layout;

const LayoutComp = ({ children }) => {
  const handleLogout = async () => {
    await logout();
    message.info("성공적으로 로그아웃 되었습니다.");
    Router.push("/");
  };
  return (
    <Layout>
      <Header>
        <div key="logo" style={{ float: "left", color: "white" }}>
          <Link href="/">
            <a style={{ color: "white" }}>THT</a>
          </Link>
        </div>
        <div key="logout" style={{ float: "right" }} onClick={() => logout()}>
          <Button onClick={handleLogout}>로그아웃</Button>
        </div>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
          {Object.keys(routes).map(path => {
            if (!routes[path].onBoard) {
              return null;
            }
            return (
              <Menu.Item key={path}>
                <Link href={path}>
                  <a>{routes[path].name}</a>
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Header>
      <Content style={{ width: "80%", margin: "auto", padding: "30px 0" }}>
        {children}
      </Content>
    </Layout>
  );
};

export default LayoutComp;
