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

  return (
    <>
      <div>Secrete Pin</div>
      <div style={{ display: "flex", width: "100%" }}>
        <Input.Password
          type="password"
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          placeholder="Pin Code"
          style={{ width: "150px" }}
          value={userPin}
        />
        <Button onClick={handleGeneratePin}>Generate</Button>
      </div>
      <small style={{ margin: "10px" }}>
        NB: Pin should be secrete to only you.
      </small>
    </>
  );
};

export default GeneratePin;
