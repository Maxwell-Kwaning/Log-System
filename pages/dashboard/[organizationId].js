import { Tabs } from "antd";
import React, { useEffect, useContext, useState } from "react";
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
  getAllLogsInRealTime,
  getAllUsersInRealTime,
  getOrganizationDetailsInRealTime,
} from "../../services/firebase.service";
import { useRouter } from "next/router";
import { AppContext } from "../../store/context";
import { actionTypes } from "../../consts/actions";
import { ContentLoading } from "../../components/ContentLoading";

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
  const router = useRouter();
  const { dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const { query } = useRouter();
  const { organizationId } = query;

  useEffect(() => {
    if (organizationId != null) {
      getOrganizationAccountDetails();
      getLogs();
      getUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId]);

  const getOrganizationAccountDetails = async () => {
    setIsLoading(true);
    await getOrganizationDetailsInRealTime(
      organizationId,
      (organizationSnap) => {
        if (organizationSnap.data() != null) {
          dispatch({
            type: actionTypes.setOrganizationDetails,
            payload: organizationSnap.data(),
          });
          setIsLoading(false);
        } else {
          // router.push(`/404`);
        }
      }
    );
  };

  const getLogs = async () => {
    await getAllLogsInRealTime(organizationId, (logsSnapshot) => {
      const logs = [];
      logsSnapshot.forEach((doc) => {
        const logLink = `${doc.data().logLink}/${doc.id}`;
        logs.push({ ...doc.data(), key: doc.id, documentId: doc.id, logLink });
      });
      dispatch({
        type: actionTypes.setLogs,
        payload: logs,
      });
    });
  };

  const getUsers = async () => {
    await getAllUsersInRealTime(organizationId, (logsSnapshot) => {
      const users = [];
      logsSnapshot.forEach((doc) => {
        users.push({ ...doc.data(), key: doc.id, documentId: doc.id });
      });
      dispatch({
        type: actionTypes.setUsers,
        payload: users,
      });
    });
  };

  return (
    <>
      {isLoading ? (
        <div style={{ margin: "20px" }}>
          <ContentLoading />
        </div>
      ) : (
        <Tabs tabPosition="left" items={items} />
      )}
    </>
  );
};

export default OrganizationDashboard;
