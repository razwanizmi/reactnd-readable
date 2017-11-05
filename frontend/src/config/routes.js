import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HelloWorld } from "../components";

const getRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={HelloWorld} />
      </Switch>
    </BrowserRouter>
  );
};

export default getRoutes;
