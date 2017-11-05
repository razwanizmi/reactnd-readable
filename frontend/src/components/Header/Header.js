import React from "react";
import PropTypes from "prop-types";

const Header = ({ title, text, color }) => {
  return (
    <div className="jumbotron" style={{ background: color }}>
      <div className="container">
        <h1 className="display-3 text-center">{title}</h1>
        <p className="lead text-center">{text}</p>
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string
};

export default Header;
