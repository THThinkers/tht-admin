import { Layout, Menu } from "antd";
import Link from "next/link";
import routes from "../routes";

const { Header, Content, Footer } = Layout;

const LayoutComp = ({ children }) => {
  return (
    <Layout>
      <Header>
        <div style={{ float: "left", color: "white" }}>THT</div>
        <Menu theme="dark" mode="horizontal" style={{ lineHeight: "64px" }}>
          {Object.keys(routes).map(path => {
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
      <Content style={{ width: "80%", margin: "auto" }}>{children}</Content>
    </Layout>
  );
};

export default LayoutComp;
