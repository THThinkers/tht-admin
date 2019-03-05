import { Col, Button, Popconfirm, message, Switch } from "antd";
import { useState, useCallback, useMemo } from "react";
import Router from "next/router";
import { CenterRow, Layout, VerifyButton, WithAuth } from "../components";
import { getUserProfile, deleteUser, updateUser } from "../api/user";
import { getCookie } from "../utils/auth";
import { isBrowser } from "../utils/environment";
import { useAsyncAction, useAsyncTask } from "../hooks/async";

const Label = {
  username: "아이디",
  name: "이름",
  phoneNumber: "전화번호",
  description: "자기소개",
  major: "학과",
  studentId: "학번",
  isActive: "활동 여부"
};
const Order = {
  username: 1,
  name: 2,
  phoneNumber: 3,
  description: 4,
  major: 5,
  studentId: 6,
  isActive: 7
};
const pickCommon = (from, base) =>
  Object.keys(base).reduce((acc, key) => {
    return {
      ...acc,
      [key]: from[key]
    };
  }, {});
const orderByInfo = (from, sortInfo) => {
  return Object.entries(from)
    .map(([key, value]) => [key, value])
    .sort(([first], [second]) => {
      if (sortInfo[first] && sortInfo[second])
        return sortInfo[first] - sortInfo[second];
      if (sortInfo[first]) return -1;
      else return 0;
    });
};

const profile = ({ user, error, isExist }) => {
  if (!isExist) {
    return <Layout>회원정보를 찾을 수 없습니다.</Layout>;
  }
  const {
    isVerified: initialVerified,
    _id: userId,
    isActive: initailIsActive,
    ...mainInfo
  } = user;
  const pickedInfo = pickCommon(mainInfo, Label);
  const normalized = useMemo(() => orderByInfo(pickedInfo, Order), []);
  const [isVerified, setIsVerified] = useState(initialVerified);
  const [isActive, setIsActive] = useState(initailIsActive);
  const handleVerified = useCallback(success => {
    if (success) {
      setIsVerified(prev => !prev);
    }
  }, []);
  const onConfirmDelete = useAsyncTask({
    api: deleteUser,
    parameter: { userId },
    callback: (success, payload) => {
      if (success && payload.success) {
        message.success("계정 삭제에 성공하였습니다.");
        return Router.push("/user");
      }
      message.error("계정삭제에 실패하였습니다.");
    }
  });
  const [updateStatus, updateAction] = useAsyncAction({
    api: updateUser
  });
  const onCheckIsActive = useCallback(async checked => {
    try {
      const data = await updateAction({ _id: userId, isActive: checked });
      setIsActive(prev => !prev);
    } catch (err) {
      message.error("에러가 발생했습니다.");
    }
  }, []);
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
          style={{ backgroundColor: "white", borderRadius: 10, minWidth: 400 }}
        >
          <tbody>
            {normalized.map(([key, value]) => {
              return (
                <tr key={key}>
                  <th scope="row">{Label[key]}</th>
                  <td>
                    {key === "isActive" ? (
                      <Switch
                        defaultChecked={isActive}
                        checked={isActive}
                        onChange={onCheckIsActive}
                      />
                    ) : (
                      value
                    )}
                  </td>
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
