import React, { Fragment } from "react";

const RadioButtonField = ({ onChange, value, name, type, checked, src }) => {
  return (
    <Fragment>
      <label>
        <input
          className="fb3"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <img src={src} />
      </label>
    </Fragment>
  );
};

export default RadioButtonField;
