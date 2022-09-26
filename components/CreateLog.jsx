import React, { useContext } from "react";
import { Input } from "antd";
import { AppContext } from "../store/context";
import { actionTypes } from "../consts/actions";

const CreateLog = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>Log sheet name</div>
      <Input
        placeholder="e.g staff meeting, math 101 lecture"
        value={state.logSheetName}
        onChange={(e) =>
          dispatch({
            type: actionTypes.setLogSheetName,
            payload: e.target.value,
          })
        }
      />
    </div>
  );
};

export default CreateLog;
