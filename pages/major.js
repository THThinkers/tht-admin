import {
  List,
  Input,
  Button,
  Row,
  Col,
  Card,
  message,
  Icon,
  Divider
} from "antd";
import { useState, useMemo, useRef } from "react";
import { getCookie } from "../utils/auth";
import { Layout, WithAuth } from "../components";
import { getMajorList, updateMajor, deleteMajor, addMajor } from "../api/major";
import { useAsyncAction } from "../hooks/async";

const Major = ({ payload }) => {
  const [majors, setMajors] = useState(payload);
  const inputRef = useRef(null);
  const handlingMessage = (type, success) => {
    if (success) {
      message.success(`${type}에 성공하였습니다.`);
    } else {
      message.error("에러가 발생하였습니다. 다시 시도해주세요.");
    }
  };
  const [addStatus, addAction] = useAsyncAction({
    api: addMajor,
    callback: (data, success) => {
      handlingMessage("학과 추가", success);
      success && setMajors(prev => [...prev, data.payload]);
    }
  });
  const [deleteStatus, deleteAction] = useAsyncAction({
    api: deleteMajor,
    callback: (data, success) => {
      handlingMessage("학과 제거", success);
      success &&
        setMajors(prev => prev.filter(major => major._id !== data.payload));
    }
  });
  console.log("ff");
  return (
    <Layout>
      <Row type="flex" justify="center">
        <Col md={8} xs={16}>
          <Input
            ref={inputRef}
            width={200}
            size="large"
            placeholder="추가할 학과를 입력하세요."
            onPressEnter={() =>
              addAction({ name: inputRef.current.input.value })
            }
            addonAfter={
              <Button
                type="primary"
                onClick={() =>
                  addAction({ name: inputRef.current.input.value })
                }
              >
                학과 추가
              </Button>
            }
          />
        </Col>
      </Row>
      <h1>학과 목록</h1>
      <Row>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={majors}
          renderItem={major => (
            <List.Item>
              <Card
                actions={[
                  <Icon
                    style={{ color: "red" }}
                    type="delete"
                    onClick={() => deleteAction({ majorId: major._id })}
                  />
                ]}
              >
                {major.name}
              </Card>
            </List.Item>
          )}
        />
      </Row>
    </Layout>
  );
};

Major.getInitialProps = async ({ query, ...ctx }) => {
  try {
    const cookie = getCookie(ctx);
    const option = { headers: { ...(cookie ? { cookie } : {}) } };
    const { data } = await getMajorList({ option });
    return data;
  } catch (err) {
    console.error(err);
    return {
      error: err,
      isExist: false
    };
  }
};

export default WithAuth(Major);
