import { useMemo, useState, useCallback } from "react";
import { message, Table, Switch } from "antd";
import Link from "next/link";
import { VerifyButton } from ".";
import { updateUser } from "../api/user";
import { useAsyncAction } from "../hooks/async";

const UserList = ({ users: initialUsers }) => {
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
        key: "major",
        render: (_, { major }) => <span>{major && major.name}</span>
      },
      {
        title: "학번",
        dataIndex: "studentId",
        key: "studentId"
      },
      {
        title: "활동여부",
        dataIndex: "isActive",
        key: "isActive",
        render: (_, record) => (
          <Switch
            checked={record.isActive}
            onChange={handleActiveUser(record._id)}
          />
        )
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
  const [updateStatus, updateAction] = useAsyncAction({
    api: updateUser
  });
  const handleActiveUser = useCallback(
    userId => async checked => {
      try {
        const { user } = await updateAction({ _id: userId, isActive: checked });
        if (user) {
          setUsers(prevUsers =>
            prevUsers.map(user =>
              user._id === userId ? { ...user, isActive: !user.isActive } : user
            )
          );
        }
      } catch (err) {
        message.error("에러가 발생했습니다.");
      }
    },
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
    <Table columns={columns} dataSource={users} rowKey={record => record._id} />
  );
};

export default UserList;
