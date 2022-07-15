import React, { useState } from "react";

const InputField = (props) => {
  return (
    <div className="mb-6">
      <input
        type={props.type}
        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder={props.placeholder}
        value={props.value}
        onChange={(ev) => props.onChange(ev.target.value)}
      />
    </div>
  );
};

export default InputField;
