import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { authService } from "../services/AuthService";
import { useHistory } from "react-router-dom";

export default function Navbar() {
  const { user } = useAuth();
  const history = useHistory();
  const token = localStorage.getItem("token");
  const { logout } = useAuth();

  return (
    <div>
      <ul className="d-flex p-3">
        <li className="m-3">
          <Link to="/">All Galleries</Link>
        </li>
        {!token && (
          <li className="m-3">
            <Link to="/login">Login</Link>
          </li>
        )}
        {!token && (
          <li className="m-3">
            <Link to="/register">Register</Link>
          </li>
        )}
        {token && (
          <li className="m-3">
            <Link to="/my-galleries">My Galleries</Link>
          </li>
        )}
        {token && (
          <li className="m-3">
            <Link to="/create">Create New Gallery</Link>
          </li>
        )}
        {token && (
          <li className="m-3">
            Logged in as: {user.first_name} {user.last_name}
          </li>
        )}
        {token && (
          <li className="m-3">
            <button onClick={logout}>Logout</button>
          </li>
        )}
      </ul>
    </div>
  );
}
