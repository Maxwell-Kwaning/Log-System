import { Tabs } from "antd";
import React, { useEffect, useContext } from "react";
import {
  BiSpreadsheet,
  BiBookContent,
  BiUserPlus,
  BiCategoryAlt,
} from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
import { NewLogSheet } from "../../components/Dashboard/Common/CreateLogSheet";
import UserRegistration from "../../components/Dashboard/Common/UserRegistration";
import { LogSheets } from "../../components/Dashboard/Common/ViewLogs";
import { Users } from "../../components/Dashboard/Common/ViewUsers";
import { EditDetails } from "../../components/Dashboard/Tertiary/EditDetails";
import {
  getOrganizationDetails,
  getOrganizationDetailsInRealTime,
} from "../../services/firebase.service";
import { useRouter } from "next/router";
import { AppContext } from "../../store/context";
import { actionTypes } from "../../consts/actions";

const items = [
  {
    label: (
      <>
        <MdSettings /> Account Settings
      </>
    ),
    key: "account-settings",
    children: <EditDetails />,
  },
  {
    label: (
      <>
        <BiSpreadsheet /> Create log sheet
      </>
    ),
    key: "create-log-sheet",
    children: <NewLogSheet />,
  },
  {
    label: (
      <>
        <BiBookContent /> View Log sheets
      </>
    ),
    key: "view-log-sheets",
    children: <LogSheets />,
  },
  {
    label: (
      <>
        <BiUserPlus /> New User
      </>
    ),
    key: "create-new-user",
    children: <UserRegistration />,
  },
  {
    label: (
      <>
        <HiUserGroup /> View users
      </>
    ),
    key: "view-users",
    children: <Users />,
  },
  {
    label: (
      <>
        <BiCategoryAlt /> New User Category
      </>
    ),
    key: "new-user-category",
    children: "New User Category",
  },
];

const OrganizationDashboard = () => {
  const { dispatch } = useContext(AppContext);

  const { query } = useRouter();
  const { organizationId } = query;

  useEffect(() => {
    const getOrganizationAccountDetails = async () => {
      await getOrganizationDetailsInRealTime(
        organizationId,
        (organizationSnap) => {
          dispatch({
            type: actionTypes.setOrganizationDetails,
            payload: organizationSnap.data(),
          });
        }
      );
    };

    if (organizationId != null) {
      getOrganizationAccountDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId]);

  return (
    <>
      <Tabs tabPosition="left" items={items} />
    </>
  );
};

export default OrganizationDashboard;
