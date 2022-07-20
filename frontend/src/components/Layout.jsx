import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import client from "../../lib/client";
import Button from "./Button";

const tabs = [
  { to: "/", title: "My Lists" },
  { to: "/friends", title: "Friends" },
  { to: "/archive", title: "Archive" },
];

const Layout = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fn = async () => {
      const user = await client.fetchUser();
      console.log("USER: ", user);
      setUser(user);
      localStorage.setItem("username", user.username);
    };

    fn();
  }, []);

  const username = localStorage.getItem("username");

  if (!user) return null;

  const navigate = useNavigate();

  const handleLogOut = () => {
    client.logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="px-72 text-center text-purple-100 text-2xl">
        <h1 className="pt-4 w-72 font-bold text-5xl float-left">Wishlist</h1>
        <div className="float-right w-2/6 flex items-center">
          <div className="flex-1">
            Hello, <b>{username}</b>
          </div>
          <div className="flex-1 my-3">
            <Button
              className="p-3 hover:bg-violet-200 hover:text-slate-700 rounded-lg"
              buttonText="Log Out"
              onClick={handleLogOut}
            />
          </div>
        </div>
      </nav>

      <div className="h-12 my-5 text-lg border-b border-violet-500 text-center">
        {tabs.map((tab, idx) => (
          <Link
            key={idx}
            className="rounded-lg mx-4 px-3 py-4 text-slate-700 font-semibold hover:bg-violet-200 hover:text-slate-900"
            to={tab.to}
          >
            {tab.title}
          </Link>
        ))}
      </div>
      <div className="flex-1">{children}</div>

      <footer className="flex-col py-5 bg-white border-t border-violet-500">
        <div className="flex-1 text-base text-slate-800 text-center">
          © 2022 Stardust™
        </div>
      </footer>
    </div>
  );
};

export default Layout;
