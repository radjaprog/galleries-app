import React from "react";
import Navbar from "./Navbar";
import useAuth from "../hooks/useAuth";

export default function DefaultLayout({ children }) {
  const { user, login } = useAuth();

  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
