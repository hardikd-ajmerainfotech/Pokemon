import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Components/NavBar";

describe("first", () => {
  beforeEach(() => {
    render(<Navbar />, { wrapper: BrowserRouter });
  });

  test("check whether Cricket Match App text on are render or not.", () => {
    const linkElement = screen.getByText(/Cricket Match App/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("check whether Match button are visiable or not", () => {
    const linkElement = screen.getByTestId("matchbuttononnavbar");
    expect(linkElement).toBeInTheDocument();
  });
  test("check whether Player button are visiable or not", () => {
    const linkElement = screen.getByTestId("playerbuttononnavbar");
    expect(linkElement).toBeInTheDocument();
  });
  test("check whether Login button are visiable or not", () => {
    const linkElement = screen.getByTestId("loginbuttononnavbar");
    expect(linkElement).toBeInTheDocument();
  });

  test("click on Login button", () => {
    const loginButton = screen.getByTestId("loginbuttononnavbar")
      .parentElement!;
    fireEvent.click(loginButton);
    expect(loginButton).toBeInTheDocument();
  });

  test("click on Match button", () => {
    const loginButton = screen.getByTestId("matchbuttononnavbar")
      .parentElement!;
    fireEvent.click(loginButton);
    expect(loginButton).toBeInTheDocument();
  });
  test("click on Player button", () => {
    const loginButton = screen.getByTestId("playerbuttononnavbar")
      .parentElement!;
    fireEvent.click(loginButton);
    expect(loginButton).toBeInTheDocument();
  });
  test("login button position on navbar", () => {
    const loginButton = screen.getByTestId("loginbuttononnavbar");
    expect(loginButton).toHaveStyle('marginRight: "10px"');
  });
  test("match button position on navbar", () => {
    const loginButton = screen.getByTestId("matchbuttononnavbar");
    expect(loginButton).toHaveStyle('marginRight: "10px"');
  });
  test("player button position on navbar ", () => {
    const loginButton = screen.getByTestId("playerbuttononnavbar");
    expect(loginButton).toHaveStyle('marginRight: "10px"');
  });
  test("in the navbar class Navbar should have style ", () => {
    const loginButton = screen.getByTestId("header");
    expect(loginButton).toHaveStyle({backgroundColor: "#436895",
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
          boxShadow: "0px 0px 5px #cdadad"});
  });

  test("in the navbar class Navbar should have style ", () => {
    const loginButton = screen.getByTestId("toolbarid");
    expect(loginButton).toHaveStyle({display: "flex",
            minHeight: "56px",
            alignItems: "center",
            padding: "0px 10px",});
  });
});
