import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext";

function Navbar(props: any) {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null; // Should not happen with the current ThemeProvider setup
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <div>
      <header
        className="Navbar"
        style={{
          backgroundColor: "var(--navbar-bg)", // Updated
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
          boxShadow: "0px 0px 5px #cdadad", // This could also be themed if desired
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
            style={{ flexGrow: "1", color: "var(--navbar-text)" }} // Updated
          >
            Cricket Match App{" "}
          </div>
          <div>
            <NavLink to="/match">
              <button
                style={{
                  marginRight: "10px",
                  backgroundColor: "var(--button-bg)", // Updated
                  color: "var(--button-text)", // Updated
                }}
                data-testid="matchbuttononnavbar"
              >
                {" "}
                Match{" "}
              </button>
            </NavLink>
            <NavLink to="/player">
              <button
                style={{
                  marginRight: "10px",
                  backgroundColor: "var(--button-bg)", // Updated
                  color: "var(--button-text)", // Updated
                }}
                data-testid="playerbuttononnavbar"
              >
                {" "}
                Player{" "}
              </button>
            </NavLink>
            <NavLink to="/login">
              <button
                style={{
                  marginRight: "10px",
                  backgroundColor: "var(--button-bg)", // Updated
                  color: "var(--button-text)", // Updated
                }}
                data-testid="loginbuttononnavbar"
              >
                {" "}
                Login{" "}
              </button>
            </NavLink>
            <button
              onClick={toggleTheme}
              style={{
                marginRight: "10px",
                backgroundColor: "var(--button-bg)",
                color: "var(--button-text)",
              }}
              data-testid="theme-toggle-button"
            >
              {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
export default Navbar;
