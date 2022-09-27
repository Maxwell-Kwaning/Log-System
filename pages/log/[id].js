import { Button, Col, Form, Input, Row, Result, message } from "antd";
import styles from "../../styles/UserRegistration.module.css";
import { Fragment, useEffect, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import FingerPrintScanner from "../../components/FingerPrintScanner";
import {
  addNewUserLog,
  getLogDetailsInRealTime,
  userLogRequest,
} from "../../services/firebase.service";
import { useRouter } from "next/router";

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

const style = {
  color: "gray",
  fontWeight: "bold",
  textTransform: "uppercase",
  marginTop: "20px",
};

const UserLogAttendance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [logDetails, setLogDetails] = useState("");
  const router = useRouter();
  const { id } = router.query;

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const { email, pin } = values;
    const { organizationId } = logDetails;
    const res = await userLogRequest(
      organizationId.trim(),
      email.trim(),
      Number(pin.trim())
    );

    if (res.length === 0) {
      message.error("Invalid user details");
    } else {
      if (isUserLogged(email.trim())) {
        message.info("User already logged");
        return false;
      }
      await addNewUserLog(id, res[0]);
      setIsLogged(true);
      form.resetFields();
    }
  };

  useEffect(() => {
    if (id != null) {
      setIsLoading(true);
      getLogDetailsAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getLogDetailsAsync = async () => {
    await getLogDetailsInRealTime(id, (snapshot) => {
      setLogDetails({ ...snapshot.data(), documentId: snapshot.id });
      setIsLoading(false);
    });
  };

  const isUserLogged = (email) => {
    return logDetails.loggedUsers.some((user) => user.email === email);
  };

  return !isLoading ? (
    <Fragment>
      {logDetails.status === "active" ? (
        <>
          {!isLogged ? (
            <Row>
              <Col span={16} offset={5}>
                <h1 style={style}>
                  {logDetails.logSheetName || "Log Attendance"}
                </h1>
              </Col>
              <Col span={16}>
                <div>
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

                    <Form.Item
                      name="pin"
                      label="User Pin"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your Pin",
                        },
                      ]}
                    >
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
                        pattern="[0-9]*"
                        inputMode="numeric"
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
          ) : (
            <Result
              status="success"
              title="Attendance Logged successfully"
              subTitle="Verified name: Shadrack"
              extra={[
                <Button
                  type="primary"
                  key="console"
                  onClick={() => setIsLogged(false)}
                >
                  Take new log
                </Button>,
              ]}
            />
          )}
        </>
      ) : (
        <Col span={16} offset={5}>
          <h2 style={style}>This Log sheet is inactive</h2>
        </Col>
      )}
    </Fragment>
  ) : (
    <span style={style}>Loading...</span>
  );
};

export default UserLogAttendance;
