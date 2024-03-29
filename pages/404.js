import { Button, Result } from "antd";
import React from "react";
import Link from "next/link";

const App = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <>
        <Link href="/">
          <Button type="primary">Back Home</Button>
        </Link>
        <Link href="/login">
          <Button type="primary">Log back in</Button>
        </Link>
      </>
    }
  />
);

export default App;
