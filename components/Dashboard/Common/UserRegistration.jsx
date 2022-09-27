import { Button, Col, Form, Input, message, Row, Select } from "antd";
import styles from "../../../styles/UserRegistration.module.css";
import { Fragment, useEffect, useState } from "react";
import ProfilePictureUploader from "../../../components/ProfilePictureUploader";
import GeneratePin from "../../../components/GeneratePin";
import FingerPrintScanner from "../../../components/FingerPrintScanner";
import {
  addNewUser,
  createNewLogSheet,
  createNewUser,
  uploadImage,
} from "../../../services/firebase.service";
import { useRouter } from "next/router";

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

const UserRegistration = () => {
  const { query } = useRouter();
  const { organizationId } = query;
  const [userPin, setUserPin] = useState("");
  const [error, setError] = useState(undefined);
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (userPin.trim() === "") {
      setError("Please enter user pin");
      return false;
    }

    if (Number(userPin) === NaN) {
      setError("User pin Should be only digit");
      return false;
    }

    setError(undefined);
    const newUser = {
      ...values,
      phone: `${values.prefix}${values.phone}`,
      pin: Number(userPin),
    };
    await createNewUser({ ...newUser, organizationId });
    form.resetFields();
    setUserPin("");
    message.success("user added successfully");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (userPin.trim() !== "") {
      setError(undefined);
    }
  }, [userPin]);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="119">+119</Option>
        <Option value="233">+233</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Fragment>
      <h1 className={styles.title}>Add New user</h1>
      <Row>
        <Col span={16}>
          <div className={styles.userRegistrationForm}>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              initialValues={{
                prefix: "233",
              }}
              scrollToFirstError
            >
              <Form.Item
                label="Full name"
                name="fullname"
                rules={[
                  {
                    required: true,
                    message: "Please enter your full name!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "please enter a valid email address",
                  },
                  {
                    required: true,
                    message: "Please enter user email address",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Please select gender!",
                  },
                ]}
              >
                <Select placeholder="select your gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
              <Form.Item name="pin" label="User Pin">
                <div className={styles.userPinGenerator}>
                  <GeneratePin pin={userPin} setPin={setUserPin} />
                  {error && (
                    <div className="ant-form-item-explain-error">{error}</div>
                  )}
                </div>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" block>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
        {false && (
          <Col span={8}>
            <div className={styles.profileImageUploadSection}>
              Profile Picture
              <div className="user-registration-profile-wrapper">
                <ProfilePictureUploader
                  fileList={fileList}
                  setFileList={setFileList}
                />
              </div>
              <FingerPrintScanner />
            </div>
          </Col>
        )}
      </Row>
    </Fragment>
  );
};

export default UserRegistration;
