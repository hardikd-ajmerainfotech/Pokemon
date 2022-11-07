import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Login from "../Login";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { toast } from "react-toastify";
import axios from "axios";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
interface player {
  login: jest.Mock<any, any>;
}
jest.mock("axios");

test("renders login text on login page.", () => {
    render(<Login />, { wrapper: BrowserRouter });
  const linkElement = screen.getByTestId("login");
  expect(linkElement).toBeInTheDocument();
});

test("renders first name text on login page.", () => {
    render(<Login />, { wrapper: BrowserRouter });
  const linkElement = screen.getByTestId("first name");
  expect(linkElement).toBeInTheDocument();
});

test("renders password on login page.", () => {
    render(<Login />, { wrapper: BrowserRouter });
  const linkElement = screen.getByTestId("password");
  expect(linkElement).toBeInTheDocument();
});

test("click on Login button", () => {
    render(<Login />, { wrapper: BrowserRouter });
  userEvent.click(screen.getByTestId("Login-button"));
});

test("Should  first Name input field is render ?", () => {
    render(<Login />, { wrapper: BrowserRouter });
  const linkElement = screen.getByPlaceholderText("First Name");
  expect(linkElement).toBeInTheDocument();
});

test("Should password input field is render ?", () => {
    render(<Login />, { wrapper: BrowserRouter });
  const linkElement = screen.getByPlaceholderText("Password");
  expect(linkElement).toBeInTheDocument();
});

test("fill user login value and click on login button", async () => {
    render(<Login />, { wrapper: BrowserRouter });
  userEvent.type(screen.getByPlaceholderText("First Name"), "Name");
  userEvent.type(screen.getByPlaceholderText("Password"), "Test@123");
  await waitFor(() => {
    expect(screen.getByPlaceholderText("First Name")).toHaveValue("Name");
    expect(screen.getByPlaceholderText("Password")).toHaveValue("Test@123");
  });
  userEvent.click(screen.getByTestId("Login-button"));
});

test("click on registration button and Login successfully", async () => {
  const response = { status: 200 };
  (axios.post as jest.Mock).mockReturnValue(response);
  await act(async () => {
    render(<Login />, { wrapper: BrowserRouter });
  });
  const submitButton = screen.getByTestId("Login-button");
  const usernameNode = screen.getByPlaceholderText("First Name");
  const passwordNode = screen.getByPlaceholderText("Password");
  userEvent.type(usernameNode, "HardikTest");
  userEvent.type(passwordNode, "Test@123");
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(toast.success).toHaveBeenCalled();
  });
});

test("click on registration button and Login failed", async () => {
  const response = { status: 400 };
  (axios.post as jest.Mock).mockRejectedValue(response);
  await act(async () => {
    render(<Login />, { wrapper: BrowserRouter });
  });
  const submitButton = screen.getByTestId("Login-button");
  const usernameNode = screen.getByPlaceholderText("First Name");
  const passwordNode = screen.getByPlaceholderText("Password");
  userEvent.type(usernameNode, "HardikTest");
  userEvent.type(passwordNode, "Te");
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalled();
  });
});
