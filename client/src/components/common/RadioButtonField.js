import React from "react";

const RadioButtonField = ({ onChange, value, name, type, checked, src }) => {
  return (
    <div className="form-group">
      <label>
        <input
          className="fb3"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <img alt="" src={src} />
      </label>
    </div>
  );
};

export default RadioButtonField;
