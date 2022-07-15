import React, { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import ErrorHelper from "../components/ErrorHelper";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleRegister = async (ev) => {
    ev.preventDefault();
    let errors = [];
    console.log(data);
    data.passwordConfirmed = null;

    if (data.fullName.trim().length === 0) {
      errors.push("Full name is required");
    }

    if (data.username.trim().length === 0) {
      errors.push("Username is required");
    }

    if (data.email.trim().length === 0) {
      errors.push("Email is required");
    }

    if (data.password.trim().length === 0) {
      errors.push("Password is required");
    }

    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email.trim())
    ) {
      errors.push("Email format is not valid");
    }

    if (!/^[a-z0-9]+$/.test(data.username.trim())) {
      errors.push("Username format is not valid");
    }

    if (data.passwordConfirmed !== null) {
      if (data.password.trim() !== data.passwordConfirmed.trim()) {
        errors.push("Passwords are not matching");
      }
    }

    setErrors(errors);
    if (errors.length == 0) {
      try {
        await client.register({
          fullName: data.fullName,
          username: data.username,
          email: data.email,
          password: data.password,
        });
        navigate("/", { replace: true });
      } catch (err) {
        setErrors(["Invalid input values"]);
      }
    }
  };

  const handleChange = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <AuthLayout>
      <div className="mb-5">
        <form onSubmit={handleRegister}>
          <ErrorHelper errors={errors} />

          <div className="mb-6">
            <h2 className="w-full px-4 py-2 text-xl font-medium text-center text-violet-500">
              Hello! Let's get you started.
            </h2>
          </div>

          {/* <!-- Full name input --> */}
          <InputField
            type="text"
            placeholder="Full name"
            value={data.fullName}
            onChange={(value) => handleChange("fullName", value)}
          />

          {/* <!-- Username input --> */}
          <InputField
            type="text"
            placeholder="Username"
            value={data.username}
            onChange={(value) => handleChange("username", value)}
          />

          {/* <!-- Email input --> */}
          <InputField
            type="text"
            placeholder="Email address"
            value={data.email}
            onChange={(value) => handleChange("email", value)}
          />

          {/* <!-- Password input --> */}
          <InputField
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(value) => handleChange("password", value)}
          />

          <InputField
            type="password"
            placeholder="Repeat password"
            value={data.passwordConfirmed}
            onChange={(value) => handleChange("passwordConfirmed", value)}
          />

          {/* <!-- Submit button --> */}
          <Button
            type="submit"
            className="inline-block px-7 py-3 bg-violet-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-violet-600 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            buttonText="Sign Up"
          />
        </form>
      </div>
      <div className="py-4 text-l font-medium text-center text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="font-bold hover:underline text-violet-500">
          Log in here!
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Register;
