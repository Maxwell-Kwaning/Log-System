import { Input } from "antd";
import React, { useContext, useEffect } from "react";
import { actionTypes, context as tContext } from "../../../consts/actions";
import { validateTertiaryDetails } from "../../../helpers/organizations";
import { AppContext } from "../../../store/context";
import { AddList } from "../../AddList";
import styles from "./OrganizationSetup.module.css";

const { TextArea } = Input;

const { addDepartment, removeDepartment, editDepartment } =
  actionTypes.tertiary;

const context = tContext.tertiary;
const { setName, setAbout, setEmail, setPassword } = actionTypes.tertiary;

const Tertiary = () => {
  const { state, dispatch } = useContext(AppContext);

  const { accountDetails } = state.selectedOrganization;
  const { name, about, email, password, departments } = accountDetails;

  const handleChange = (type, payload) => {
    dispatch({ context, type, payload });
  };

  const handleAddDepartment = (newDepartment) => {
    handleDispatch(addDepartment, newDepartment);
  };

  const handleEditDepartment = (updatedDepartment) => {
    handleDispatch(editDepartment, updatedDepartment);
  };
  const handleRemoveDepartment = (id) => {
    handleDispatch(removeDepartment, id);
  };

  const handleDispatch = (type, payload) => {
    dispatch({
      context,
      type,
      payload,
    });
  };

  useEffect(() => {
    const payload = validateTertiaryDetails(accountDetails);
    dispatch({
      type: actionTypes.setOrganizationSetupValidity,
      payload,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountDetails]);

  return (
    <>
      <div className={styles.formItem}>
        <label>Tertiary Institution name</label>
        <Input
          placeholder="Organization name"
          value={name}
          onChange={(e) => handleChange(setName, e.target.value)}
        />
      </div>
      <div className={styles.formItem}>
        <label>About Institution</label>
        <TextArea
          rows={4}
          placeholder="tell us a bit more about your organization"
          maxLength={200}
          value={about}
          onChange={(e) => handleChange(setAbout, e.target.value)}
        />
      </div>
      <AddList
        title="New Department"
        label="Add Departments"
        tags={departments}
        addTag={handleAddDepartment}
        editTag={handleEditDepartment}
        removeTag={handleRemoveDepartment}
      />
      <div>
        <h2 style={{ padding: "0 20px" }}>Login Details</h2>
        <div className={styles.formItem}>
          <label>Email</label>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => handleChange(setEmail, e.target.value)}
          />
        </div>
        <div className={styles.formItem}>
          <label>Password</label>
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={(e) => handleChange(setPassword, e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default Tertiary;
