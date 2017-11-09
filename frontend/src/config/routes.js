import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  FeedContainer,
  EditPostContainer,
  NewPostContainer
} from "../containers";
import { NavBar } from "../components";

const getRoutes = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Switch>
          <Route path="/posts/new" component={NewPostContainer} />
          <Route
            path="/:categoryId/:postId/edit"
            component={EditPostContainer}
          />
          <Route path="/:categoryId" component={FeedContainer} />
          <Route component={FeedContainer} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default getRoutes;
