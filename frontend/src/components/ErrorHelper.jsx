import React from "react";

const ErrorHelper = ({ errors }) => {
  console.log("Errors: ", errors);

  if (errors.length === 0) return null;

  return (
    <div className="bg-red-300 mx-auto p-4">
      <ul>
        {errors.map((error, idx) => (
          <li key={idx} className="text-red-800 font-bold">
            {error}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorHelper;
