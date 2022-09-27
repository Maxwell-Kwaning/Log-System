import { useEffect } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { accountLoginRequest } from "../../services/firebase.service";
import styles from "../../styles/AdminLogin.module.css";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  const onFinish = (values) => {
    const { email, password } = values;

    accountLoginRequest(email, password).then((res) => {
      if (res.length !== 0) {
        const { id } = res[0];

        message.success("Welcome back!");
        router.push(`/dashboard/${id}`);
      } else {
        message.error(
          "Login failed! Account details is incorrect or does not exist "
        );
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.adminLoginForm}>
      <h1 className={styles.title}>Login</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Organization E-mail"
          name="email"
          rules={[
            {
              type: "email",
              message: "please enter a valid email address",
            },
            {
              required: true,
              message: "Please input organization email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label=" " name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
