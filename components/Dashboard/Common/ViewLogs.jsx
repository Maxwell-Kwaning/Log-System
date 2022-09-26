import { Table, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../../../store/context";
import { StatusRenderer } from "../../Renderers/StatusRenderer";

const { Paragraph, Text } = Typography;

const columns = [
  {
    title: "Log Sheet Name",
    dataIndex: "logSheetName",
    key: "logSheetName",
    render: (text) => <a>{text}</a>,
    sorter: (a, b) => a.logSheetName - b.logSheetName,
  },
  {
    title: "Log Link",
    dataIndex: "logLink",
    key: "logLink",
    render: (link) => <Paragraph copyable>{link}</Paragraph>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => <StatusRenderer initialValue={status} />,
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (timestamp) => {
      const date = timestamp.toDate();
      return (
        <Text>
          {date.toLocaleDateString()} {date.getHours()}:{date.getMinutes()}:
          {date.getSeconds()}
        </Text>
      );
    },
    sorter: (a, b) => a.createdAt - b.createdAt,
  },
];

export const LogSheets = () => {
  const [data, setData] = useState([]);

  const { query } = useRouter();
  const { organizationId } = query;
  const { state } = useContext(AppContext);

  const { logs } = state.organizationDetails;

  useEffect(() => {
    setData(logs);
  }, [logs]);

  return (
    <div style={{ margin: "1rem" }}>
      <div style={{ margin: "2rem 0" }}>
        <div>
          Total Logs: <span style={{ fontWeight: "bold" }}>{data.length}</span>
        </div>
      </div>
      <Table columns={columns} dataSource={data} />;
    </div>
  );
};
