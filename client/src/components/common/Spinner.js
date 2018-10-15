import React from "react";
import spinner from "./ajax-loader.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: "150px", margin: "auto", display: "block" }}
      />
    </div>
  );
};
