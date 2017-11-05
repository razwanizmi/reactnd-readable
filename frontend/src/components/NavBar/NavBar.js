import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar blue">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Readable
        </Link>
        <div className="navbar-nav pull-right">
          <Link className="nav-item" to="/posts/new">
            Create a Post
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
