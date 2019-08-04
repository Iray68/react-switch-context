import React from "react";
import Switch, { Screen, withSwitcher } from "react-switch-context";
import Home from "./Home";
import Detail from "./Detail";
import { StoreProvider } from "./stores";
import { PAGE_DETAIL, PAGE_HOME } from "./constants";

const page = props => {
  return (
    <StoreProvider>
      <Switch>
        <Screen viewComponent={Home} name={PAGE_HOME} />
        <Screen viewComponent={Detail} name={PAGE_DETAIL} />
      </Switch>
    </StoreProvider>
  );
};

export default page;
