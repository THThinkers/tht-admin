import { useMemo, useState } from "react";
import { message, Button, Table } from "antd";
import Link from "next/link";
import { Layout, VerifyButton, WithAuth } from "../components";
import { getUserList, verifyUser } from "../api/user";
import { getCookie } from "../utils/auth";

const User = ({ users: initialUsers }) => {
  const [users, setUsers] = useState(initialUsers || []);
  const columns = useMemo(
    () => [
      {
        title: "아이디",
        dataIndex: "username",
        key: "username",
        render: (_, { _id, username }) => (
          <Link href={`/profile?userId=${_id}`}>
            <a>{username}</a>
          </Link>
        )
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
          <VerifyButton {...record} handleVerified={handleVerifyUser} />
        )
      }
    ],
    []
  );
  const handleVerifyUser = (success, userId) => {
    if (success) {
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, isVerified: !user.isVerified } : user
        )
      );
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
