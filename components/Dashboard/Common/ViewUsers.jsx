import { Table, Input } from "antd";
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../store/context";
import { getUsersColumnDefs } from "./columnDefs/users-column-def";

const { Search } = Input;

export const Users = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { state } = useContext(AppContext);

  const { users } = state;

  useEffect(() => {
    setData(users);
    setFilteredData(users);
  }, [users]);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.fullname.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText, data]);

  return (
    <div style={{ margin: "1rem" }}>
      <div style={{ margin: "2rem 0" }}>
        <div>
          Total Users: <span style={{ fontWeight: "bold" }}>{data.length}</span>
        </div>
      </div>
      <Search
        placeholder="search users by name"
        onChange={(e) => setSearchText(e.target.value)}
        enterButton
        style={{ marginBottom: "20px", width: "300px" }}
      />
      <Table
        columns={getUsersColumnDefs()}
        dataSource={filteredData}
        rowKey="key"
      />
      ;
    </div>
  );
};
