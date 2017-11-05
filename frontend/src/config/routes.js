import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Feed, NavBar } from "../components";

const getRoutes = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route component={Feed} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default getRoutes;
