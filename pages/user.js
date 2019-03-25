import Link from "next/link";
import Head from "next/head";
import { Button, Row, Col, message } from "antd";
import { getUserList } from "../api/user";
import { Layout, UserList, WithAuth, UploadButton } from "../components";
import { getCookie } from "../utils/auth";

const User = ({ users }) => {
  const { activeUsers, inActiveUsers } = users.reduce(
    (acc, user) => {
      user.isActive ? acc.activeUsers.push(user) : acc.inActiveUsers.push(user);
      return acc;
    },
    { activeUsers: [], inActiveUsers: [] }
  );
  const handleFileUpload = async files => {
    const file = files[0];
    const handlingError = () =>
      message.error("이미지 업로드에 실패하였습니다.");
    try {
      const response = await uploadImage(file, "members", "members");
      const { url } = response.data;
    } catch (err) {
      handlingError();
    }
  };
  return (
    <Layout>
      <Row gutter={16}>
        <Col lg={12} xs={24}>
          <h1>활동중인 회원</h1>
          <UserList users={activeUsers} />
        </Col>
        <Col lg={12} xs={24}>
          <h1>비 활동중인 회원</h1>
          <UserList users={inActiveUsers} />
        </Col>
      </Row>
    </Layout>
  );
};

User.getInitialProps = async ctx => {
  try {
    const cookie = getCookie(ctx);
    const option = { headers: { ...(cookie ? { cookie } : {}) } };
    const response = await getUserList(option);
    const { users } = response.data;
    return { users };
  } catch (err) {
    console.log(err);
    return { users: [] };
  }
};

export default WithAuth(User);
