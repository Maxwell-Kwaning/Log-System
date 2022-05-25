import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";

const UserCustomPin = () => {
  return (
    <Form>
      <Form.Item
        name="Pin Code"
        rules={[
          {
            message: "Please input your custom pin here!",
          },
        ]}
      >
        <Input type="password" placeholder="Pin Code" />
      </Form.Item>
    </Form>
  );
};

export default UserCustomPin;
