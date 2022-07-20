import React, { useState } from "react";

const InputField = (props) => {
  return (
    <div className="mt-2 mb-3 mx-2">
      <label className={props.labelClassName}>{props.label}</label>
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
    "form-control block w-full px-3 py-1 text-lg font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none",
};
export default InputField;
