import { Col, Button, Popconfirm, message } from "antd";
import { useState, useCallback, useMemo } from "react";
import Router from "next/router";
import { CenterRow, Layout, VerifyButton, WithAuth } from "../components";
import { getUserProfile, deleteUser } from "../api/user";
import { getCookie } from "../utils/auth";
import { isBrowser } from "../utils/environment";
import { useAsyncTask } from "../hooks/async";

const profile = ({ user, error, isExist }) => {
  if (!isExist) {
    return <Layout>회원정보를 찾을 수 없습니다.</Layout>;
  }
  const order = {
    username: 1,
    name: 2,
    phoneNumber: 3,
    description: 4,
    major: 5,
    studentId: 6
  };
  const { isVerified: initialVerified, ...mainInfo } = user;
  const [isVerified, setIsVerified] = useState(initialVerified);
  const normalized = useMemo(
    () =>
      Object.entries(mainInfo)
        .map(([key, value]) => [key, value])
        .sort(([first], [second]) => {
          if (order[first] && order[second])
            return order[first] - order[second];
          if (order[first]) return -1;
          else return 0;
        }),
    []
  );
  const handleVerified = useCallback(success => {
    if (success) {
      setIsVerified(prev => !prev);
    }
  }, []);
  const handleDeleted = (success, payload) => {
    if (success && payload.success) {
      message.success("계정 삭제에 성공하였습니다.");
      return Router.push("/user");
    }
    message.error("계정삭제에 실패하였습니다.");
  };
  const onConfirmDelete = useAsyncTask({
    api: deleteUser,
    parameter: { userId: user._id },
    callback: handleDeleted
  });
  return (
    <Layout>
      <CenterRow type="flex" justify="center">
        <h1>{user.username}의 프로필</h1>
      </CenterRow>
      <CenterRow
        type="flex"
        justify="center"
        style={{ fontSize: 18, margin: 20 }}
      >
        <table
          cellPadding={30}
          style={{ backgroundColor: "white", borderRadius: 10 }}
        >
          <tbody>
            {normalized.map(([key, value]) => {
              return (
                <tr key={key}>
                  <th scope="row">{key}</th>
                  <td>{value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CenterRow>
      <CenterRow
        type="flex"
        justify="center"
        gutter={12}
        style={{ fontSize: 18 }}
      >
        <Col>
          <VerifyButton
            {...user}
            isVerified={isVerified}
            handleVerified={handleVerified}
          />
        </Col>
        <Col>
          <Popconfirm
            title="정말 이 계정을 탈퇴시키겠습니까?"
            onConfirm={onConfirmDelete}
            okText="예"
            cancelText="아니오"
          >
            <Button type="danger">탈퇴</Button>
          </Popconfirm>
        </Col>
      </CenterRow>
      <CenterRow type="flex" justify="center" style={{ marginTop: 10 }}>
        <Button type="default" onClick={() => Router.push("/user")}>
          목록으로
        </Button>
      </CenterRow>
    </Layout>
  );
};

profile.getInitialProps = async ({ query, ...ctx }) => {
  try {
    const browser = isBrowser();
    const { userId } = browser ? query : ctx.req.query;
    const cookie = getCookie(ctx);
    const option = { headers: { ...(cookie ? { cookie } : {}) } };
    const { data } = await getUserProfile({ userId, option });
    return data;
  } catch (err) {
    return {
      error: err,
      isExist: false
    };
  }
};

export default WithAuth(profile);
