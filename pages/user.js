import { useMemo } from "react";
import { message, Button, Table } from "antd";
import { Layout } from "../components";
import { getUserList, verifyUser } from "../api/user";

const User = ({ users }) => {
  const columns = useMemo(
    () => [
      {
        title: "이름",
        dataIndex: "name",
        key: "name"
      },
      {
        align: "right",
        title: "인증",
        dataIndex: "isVerified",
        key: "isVerified",
        render: (_, record) => (
          <Button type="primary" onClick={() => handleVerifyUser(record._id)}>
            {record.isVerified ? "인증해제" : "인증"}
          </Button>
        )
      }
    ],
    []
  );
  const handleVerifyUser = async userId => {
    try {
      await verifyUser({ userId });
      message.info("인증에 성공하였습니다.");
    } catch (err) {
      message.error("에러가 발생하였습니다. 다시 시도해주세요.");
    }
  };
  return (
    <Layout>
      <Table
        columns={columns}
        dataSource={users}
        rowKey={record => record._id}
      />
    </Layout>
  );
};

User.getInitialProps = async ctx => {
  try {
    const cookie = ctx.req && ctx.req.headers ? ctx.req.headers.cookie : "";
    const option = { headers: { ...(cookie ? { cookie } : {}) } };
    const response = await getUserList(option);
    const { users } = response.data;
    return { users };
  } catch (err) {
    console.log(err);
    return { users: [] };
  }
};

export default User;
