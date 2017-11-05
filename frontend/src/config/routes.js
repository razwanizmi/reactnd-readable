import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HelloWorld, NavBar } from "../components";

const getRoutes = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route component={HelloWorld} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default getRoutes;
