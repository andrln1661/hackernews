import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

function Header() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <div className="header orange">
      <div className="header__links">
        <Link to="/">Hacker News</Link>
        {authToken && <Link to="create" >Create</Link>}
        <div>|</div>
        {authToken ? (
          <div
            onClick={(event) => {
              event.preventDefault();
              localStorage.removeItem(AUTH_TOKEN);
              navigate("/");
            }}
          >
            Logout
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}

export default Header;
