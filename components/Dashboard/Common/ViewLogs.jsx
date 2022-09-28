import { Table, Input, Button, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../store/context';
import {
  getLoggedUsersColumnDefs,
  getLogsColumnDefs,
} from './columnDefs/logs-column-def';

const { Search } = Input;
const { Paragraph } = Typography;

export const LogSheets = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const { state } = useContext(AppContext);
  const [isView, setIsView] = useState(false);
  const [loggedUsers, setLoggedUsers] = useState([]);
  const [selectedLog, setSelectedLog] = useState(undefined);
  const [logName, setLogName] = useState('');
  const [logLink, setLogLink] = useState('');

  const { logs } = state;

  useEffect(() => {
    setData(logs);
    setFilteredData(logs);

    if (selectedLog != null) {
      const updatedLog = logs.find((log) => log.id === selectedLog.id);
      if (updatedLog) {
        setLoggedUsers(updatedLog.loggedUsers);
      }
    }
  }, [logs, selectedLog]);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.logSheetName.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, data]);

  const handleViewLog = (record) => {
    setSelectedLog(record);
    setLogName(record.logSheetName);
    setLogLink(record.logLink);
    setIsView(true);
  };

  return (
    <>
      {!isView ? (
        <div style={{ margin: '1rem' }}>
          <div style={{ margin: '2rem 0' }}>
            <div>
              Total Logs:{' '}
              <span style={{ fontWeight: 'bold' }}>{data.length}</span>
            </div>
          </div>
          <Search
            placeholder="search logs by name"
            onChange={(e) => setSearchText(e.target.value)}
            enterButton
            style={{ marginBottom: '20px', width: '300px' }}
          />
          <Table
            columns={getLogsColumnDefs(handleViewLog)}
            dataSource={filteredData}
            rowKey="key"
          />
        </div>
      ) : (
        <div style={{ margin: '1rem' }}>
          <div style={{ margin: '2rem 0' }}>
            <div style={{ fontWeight: 'bold' }}>{logName}</div>
            <div>
              Number of Logs:{' '}
              <span style={{ fontWeight: 'bold' }}>{loggedUsers.length}</span>
            </div>
            <br />
            <div></div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              type="primary"
              style={{ marginBottom: '20px' }}
              onClick={() => setIsView(false)}
            >
              View all logs
            </Button>
            <Paragraph copyable>{logLink}</Paragraph>
          </div>
          <Table
            columns={getLoggedUsersColumnDefs()}
            dataSource={loggedUsers}
            rowKey="id"
          />
        </div>
      )}
    </>
  );
};
