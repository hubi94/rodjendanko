import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <nav className="text-blue-500 text-3xl">
        <ul>
          <li>
            <Link to="/">Lists</Link>
          </li>
          <li>
            <Link to="/friends">Friends</Link>
          </li>
          <li>
            <Link to="/archive">Archived lists</Link>
          </li>
        </ul>
      </nav>
      {children}
      <h1 className="text-3xl font-bold underline">Hello World!</h1>

      <Outlet />
    </>
  );
};

export default Layout;
