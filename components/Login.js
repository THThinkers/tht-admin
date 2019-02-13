import { useReducer } from "react";
import { Button, Row, Form, Input, Icon } from "antd";

const Login = ({ onSubmit }) => {
  const [form, setForm] = useReducer(
    (state, nextState) => ({ ...state, ...nextState }),
    {
      username: "",
      password: ""
    }
  );
  const handleSubmit = e => {
    e.persist();
    onSubmit(e, form);
  };
  return (
    <Row type="flex" justify="center" style={{ marginTop: "3rem" }}>
      <Form onSubmit={handleSubmit}>
        <Form.Item>
          <Input
            type="email"
            prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="username"
            value={form.username}
            onChange={e => setForm({ username: e.target.value })}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="password"
            type="password"
            value={form.password}
            onChange={e => setForm({ password: e.target.value })}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form>
    </Row>
  );
};

export default Login;
