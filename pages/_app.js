import { useReducer } from "react";
import "../styles/globals.css";
import "antd/dist/antd.css";
import { Fragment } from "react";
import Header from "../components/Header";
import { AppContext } from "../store/context";
import { appReducer } from "../store/reducers/app";

const initialState = {
  selectedOrganization: {},
  isOrganizationSetupValid: false,
  logSheetName: "",
  organizationDetails: {},
};

function MyApp({ Component, pageProps }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <Fragment>
      <AppContext.Provider value={{ state, dispatch }}>
        <Header />
        <Component {...pageProps} />
      </AppContext.Provider>
    </Fragment>
  );
}

export default MyApp;
