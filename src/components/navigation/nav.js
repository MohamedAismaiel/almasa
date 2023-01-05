import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { LoginContext } from "../context/loginContext";

import Routing from "../routing";

function Nav() {
  const logoutHandler = useContext(LoginContext).logoutHandler;
  const isAuth = useContext(LoginContext).isAuth;
  const location = useLocation();
  return (
    <header>
      {isAuth ? (
        <nav>
          <ul className="nav-links">
            <div className="nav-links-group1">
              <Link to="/">Logo</Link>
              <Link to="/sale">Sale </Link>
              <Link to="/rent">Rent </Link>
              <Link to="/commercial-sale">Commercial sale </Link>
              <Link to="/commercial-rent">Commercial rent </Link>
              <Link to="/create-apartment">create apartment</Link>
            </div>
            <div className="nav-links-group2">
              <Link to="/login" onClick={logoutHandler}>
                <button type="button" className="button button-logout">
                  Logout
                </button>
              </Link>
              <Link to="/favourites">favourites</Link>
            </div>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul className="nav-links">
            <div className="nav-links-group1">
              <Link to="/">Logo</Link>
              <Link to="/sale">Sale </Link>
              <Link to="/rent">Rent </Link>
              <Link to="/commercial-sale">Commercial sale </Link>
              <Link to="/commercial-rent">Commercial rent </Link>
            </div>
            <div className="nav-links-group2">
              <Link to="/login">
                <button type="button" className="button button-logout">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button type="button" className="button button-logout">
                  Signup
                </button>
              </Link>
              <Link to="/favourites">favourites</Link>
            </div>
          </ul>
        </nav>
      )}
      <Routing />
    </header>
  );
}

export default Nav;
