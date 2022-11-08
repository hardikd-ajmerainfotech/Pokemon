import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AddPlayer from "../Components/AddPlayer";

jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
test("click on addplayer button and Add Player successfully", async () => {
  const response = { status: 200 };
  (axios.post as jest.Mock).mockReturnValue(response);
  await act(async () => {
    render(<AddPlayer />, { wrapper: BrowserRouter });
  });
  const submitButton = screen.getByTestId("addplayerbutton");
  const firstnameNode = screen.getByPlaceholderText("First Name");
  const lastnameNode = screen.getByPlaceholderText("Last Name");
  const ageNode = screen.getByPlaceholderText("Age");
  userEvent.type(firstnameNode, "Hardik");
  userEvent.type(lastnameNode, "Test");
  userEvent.type(ageNode, "12");
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(toast.success).toHaveBeenCalled();
  });
});

test("click on addplayer button and Add Player failed", async () => {
  const response = { status: 400 };
  (axios.post as jest.Mock).mockRejectedValue(response);
  await act(async () => {
    render(<AddPlayer />, { wrapper: BrowserRouter });
  });
  const submitButton = screen.getByTestId("addplayerbutton");
  const firstnameNode = screen.getByPlaceholderText("First Name");
  const lastnameNode = screen.getByPlaceholderText("Last Name");
  const ageNode = screen.getByPlaceholderText("Age");
  userEvent.type(firstnameNode, "Hardik");
  userEvent.type(lastnameNode, "Test");
  userEvent.type(ageNode, "12");
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalled();
  });
});

