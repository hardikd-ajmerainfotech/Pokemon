import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import Register from "../Register";
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("axios");
describe("first", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test("should render registeration text on the register page.", () => {
    render(<Register />, { wrapper: BrowserRouter });
    const linkElement = screen.getByText(/Registration/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Should render first text field on the registration form", () => {
        render(<Register />, { wrapper: BrowserRouter });
    const linkElement = screen.getByText(/First Name/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Should render second text field on the registration form", () => {
    render(<Register />, { wrapper: BrowserRouter });
    const linkElement = screen.getByText(/Email/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("Should render third text field on the registration form", () => {
    render(<Register />, { wrapper: BrowserRouter });
    const linkElement = screen.getByText(/Password/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("click on registration button and Login successfully", async () => {
    const response = { status: 200 };
    (axios.post as jest.Mock).mockReturnValue(response);
    await act(async ()=>{
      render(<Register />, { wrapper: BrowserRouter });
    })
    const submitButton = screen.getByTestId("Register-button");
    const usernameNode = screen.getByPlaceholderText("First Name");
    const emailNode = screen.getByPlaceholderText("Email");
    const passwordNode = screen.getByPlaceholderText("Password");
    userEvent.type(usernameNode, "K");
    userEvent.type(emailNode,"example@gmail.com")
    userEvent.type(passwordNode, "Test123test");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });
  });

  test("click on registration button and Login Failed.", async () => {
    const response = { status: 400 };
    (axios.post as jest.Mock).mockRejectedValue(response);
    await act(async () => {
      render(<Register />, { wrapper: BrowserRouter });
    });
    const submitButton = screen.getByTestId("Register-button");
    const usernameNode = screen.getByPlaceholderText("First Name");
    const emailNode = screen.getByPlaceholderText("Email");
    const passwordNode = screen.getByPlaceholderText("Password");
    userEvent.type(usernameNode, "hfs");
    userEvent.type(emailNode, "example");
    userEvent.type(passwordNode, "Test123test");
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });

  test("click on Login button", () => {
    // userEvent.click(screen.getByTestId('Login-button'));
    render(<Register />, { wrapper: BrowserRouter });
    const loadPlayerButton = screen.getByTestId("Login-button").parentElement!;
    fireEvent.click(loadPlayerButton);
    expect(loadPlayerButton).toBeInTheDocument();
  });

  test("Should first Name input field is render or not ?", () => {
    render(<Register />, { wrapper: BrowserRouter });
    const linkElement = screen.getByPlaceholderText("First Name");
    expect(linkElement).toBeInTheDocument();
  });
  test("Should email input field is render or not ?", () => {
    render(<Register />, { wrapper: BrowserRouter });
    const linkElement = screen.getByPlaceholderText("Email");
    expect(linkElement).toBeInTheDocument();
  });

  test("Should password input field is render or not ?", () => {
    render(<Register />, { wrapper: BrowserRouter });
    const linkElement = screen.getByPlaceholderText("Password");
    expect(linkElement).toBeInTheDocument();
  });

   test("should Register Button  are render on Navbar or not", () => {
     render(<Register />, { wrapper: BrowserRouter });
     expect(screen.getByTestId("Register-button")).toBeInTheDocument();
   });

   test("should Login Button  are render on Navbar or not", () => {
     render(<Register />, { wrapper: BrowserRouter });
     expect(screen.getByTestId("Login-button")).toBeInTheDocument();
   });
});

test("click on registration button with empty input field", async () => {
  const response = { status: 400 };
  (axios.post as jest.Mock).mockRejectedValue(response);
  await act(async () => {
    render(<Register />, { wrapper: BrowserRouter });
  });
  const submitButton = screen.getByTestId("Register-button");
  const usernameNode = screen.getByPlaceholderText("First Name");
  const emailNode = screen.getByPlaceholderText("Email");
  const passwordNode = screen.getByPlaceholderText("Password");
  userEvent.type(usernameNode, "");
  userEvent.type(emailNode, "");
  userEvent.type(passwordNode, "");
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalled();
  });
});