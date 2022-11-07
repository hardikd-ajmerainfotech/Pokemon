import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props: any) {
  return (
    <div>
      <header
        className="Navbar"
        style={{
          backgroundColor: "#436895",
          position: "fixed",
          top: "0",
          left: "auto",
          right: "0",
          boxSizing: "border-box",
          fontSize: "18px",
          fontWeight: "bold",
          fontFamily: "sans-serif",
          width: "100%",
          zIndex: "1000",
          boxShadow: "0px 0px 5px #cdadad",
        }}
        data-testid="header"
      >
        <div
          className="Toolbar"
          data-testid="toolbarid"
          style={{
            display: "flex",
            minHeight: "56px",
            alignItems: "center",
            padding: "0px 10px",
          }}
        >
          <div
            className="Title"
            data-testid="navbarAppName"
            style={{ flexGrow: "1" ,color: "#f3f9ff"}}
          >
            Cricket Match App{" "}
          </div>
          <div>
            <NavLink to="/match">
              <button
                style={{ marginRight: "10px" }}
                data-testid="matchbuttononnavbar"
              >
                {" "}
                Match{" "}
              </button>
            </NavLink>
            <NavLink to="/player">
              <button
                style={{ marginRight: "10px" }}
                data-testid="playerbuttononnavbar"
              >
                {" "}
                Player{" "}
              </button>
            </NavLink>
            <NavLink to="/login">
              <button
                style={{ marginRight: "10px" }}
                data-testid="loginbuttononnavbar"
              >
                {" "}
                Login{" "}
              </button>
            </NavLink>
          </div>
        </div>
      </header>
    </div>
  );
}
export default Navbar;
