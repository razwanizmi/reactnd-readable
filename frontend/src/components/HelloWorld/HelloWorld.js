import React from "react";
import { Header } from "../";

const HelloWorld = () => {
  return (
    <div>
      <Header
        title="Welcome to Readable"
        text="Where words sing, and sentences dance 🕺💃"
      />
      <div className="container">Hello world!</div>
    </div>
  );
};

export default HelloWorld;
