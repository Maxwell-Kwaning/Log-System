import { Button, Col, Form, Input, Row, Select } from "antd";
import styles from "../../styles/UserRegistration.module.css";
import { Fragment } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import FingerPrintScanner from "../../components/FingerPrintScanner";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const UserLogAttendance = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Fragment>
      <h1 className={styles.title}>Log Attendance</h1>
      <Row>
        <Col span={16}>
          <div className={styles.userRegistrationForm}>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                prefix: "233",
              }}
              scrollToFirstError
            >
              <Form.Item {...tailFormItemLayout}>
                <FingerPrintScanner />
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="pin" label="User Pin">
                <Input.Password
                  type="password"
                  name="pin"
                  label="User Pin"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  placeholder="Pin Code"
                  style={{ width: "150px" }}
                  maxLength={6}
                />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" block>
                  Log
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.fingerPrintSection}></div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default UserLogAttendance;
