import React, { useState } from "react";

const InputField = (props) => {
  return (
    <div className="mb-4">
      <label>{props.label}</label>
      <input
        type={props.type}
        className={props.className}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(ev) => props.onChange(ev.target.value)}
      />
    </div>
  );
};

InputField.defaultProps = {
  className:
    "form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none",
};
export default InputField;
