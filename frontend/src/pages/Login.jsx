import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../../lib/client";
import AuthLayout from "../components/AuthLayout";
import ErrorHelper from "../components/ErrorHelper";
import Button from "../components/Button";
import InputField from "../components/InputField";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const handleLogin = async (ev) => {
    ev.preventDefault();
    let errors = [];

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

    setErrors(errors);
    if (errors.length == 0) {
      try {
        let resp = await client.login({
          email: data.email,
          password: data.password,
        });

        navigate("/", { replace: true });
      } catch (err) {
        setErrors(["Invalid username/password"]);
      }
    }
  };

  const handleChange = (name, value) => {
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <AuthLayout>
      <div className="mb-5">
        <form onSubmit={handleLogin}>
          <ErrorHelper errors={errors} />

          <div className="mb-6">
            <h2 className="w-full px-4 py-2 text-xl font-medium text-center text-violet-500">
              Welcome back!
            </h2>
          </div>

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

          {/* <!-- Submit button --> */}
          <Button
            type="submit"
            className="inline-block px-7 py-3 bg-violet-500 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-violet-600 hover:shadow-lg focus:bg-violet-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-violet-800 active:shadow-lg transition duration-150 ease-in-out w-full"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            buttonText="Sign In"
          />
        </form>
      </div>
      <div className="py-4 text-l font-medium text-center text-gray-500">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-bold hover:underline text-violet-500"
        >
          Register here!
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;
