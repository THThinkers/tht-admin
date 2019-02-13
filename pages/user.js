import { useMemo, useState } from "react";
import { message, Button, Table } from "antd";
import { Layout, WithAuth } from "../components";
import { getUserList, verifyUser } from "../api/user";

const User = ({ payload }) => {
  const [users, setUsers] = useState(payload.users || []);
  const columns = useMemo(
    () => [
      {
        title: "아이디",
        dataIndex: "username",
        key: "username"
      },
      {
        title: "이름",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "전공",
        dataIndex: "major",
        key: "major"
      },
      {
        title: "학번",
        dataIndex: "studentId",
        key: "studentId"
      },
      {
        align: "right",
        title: "인증",
        dataIndex: "isVerified",
        key: "isVerified",
        defaultSortOrder: "descend",
        sorter: (a, b) => b.isVerified - a.isVerified,
        render: (_, record) => (
          <Button
            type={record.isVerified ? "danger" : "primary"}
            onClick={() => handleVerifyUser(record._id)}
          >
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
      message.info("인증변경에 성공하였습니다.");
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, isVerified: !user.isVerified } : user
        )
      );
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

export default WithAuth(User);
