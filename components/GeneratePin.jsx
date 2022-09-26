import { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import * as securePin from "secure-pin";

const GeneratePin = () => {
  const [userPin, setUserPin] = useState("");

  const handleGeneratePin = () => {
    generatePin();
  };

  const generatePin = () => {
    securePin.generatePin(6, (pin) => {
      setUserPin(pin);
    });
  };

  const handleOnChange = (e) => {
    setUserPin(e.target.value);
  };

  return (
    <>
      <div style={{ display: "flex", width: "100%" }}>
        <Input.Password
          type="password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          placeholder="Pin Code"
          style={{ width: "150px" }}
          value={userPin}
          maxLength={6}
          onChange={handleOnChange}
          pattern="[0-9]*"
          inputMode="numeric"
        />
        <Button onClick={handleGeneratePin}>Generate</Button>
      </div>
      <small style={{ margin: "10px 0" }}>
        Pin should be 4-6 digits and must be secrete to only you.
      </small>
    </>
  );
};

export default GeneratePin;
