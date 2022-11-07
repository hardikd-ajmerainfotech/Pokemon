import {
  act,
  fireEvent,
  getByRole,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import AddMatch from "../AddMatch";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
test("click on addmatch button and Add match successfully", async () => {
   const response = { status: 200 };
   (axios.post as jest.Mock).mockReturnValue(response);
   await act(async ()=> {
     render(<AddMatch />, { wrapper: BrowserRouter });
   })
   const submitButton = screen.getByTestId("addmatchbutton");
   const firstnameNode = screen.getByTestId("matchName");
   const totalaudienceNode = screen.getByTestId("totalAudience");
  // Confirm default state.
  expect(await screen.findByText(/the thing is/i)).toBeInTheDocument();
  // Click on the MUI "select" (as found by the label).
  const selectLabel = /Add Players/i;
  const selectEl = await screen.findByLabelText(selectLabel);

  expect(selectEl).toBeInTheDocument();

  userEvent.click(selectEl);
  // Locate the corresponding popup (`listbox`) of options.
  const optionsPopupEl = await screen.findByRole("listbox", {
    name: selectLabel,
  });
  // Click an option in the popup.
  userEvent.click(within(optionsPopupEl).getByText(/Rohit/i));
expect(
  await screen.findByText(
    /The thing is: 0/i
  )
).toBeInTheDocument();
userEvent.type(firstnameNode, "Pak Vs Eng");
userEvent.type(totalaudienceNode, "0");
fireEvent.click(submitButton);
 await waitFor(() => {
   expect(toast.success).toHaveBeenCalled();
 });
});

test("click on addmatch button and Add match failed", async () => {
  const response = { status: 400 };
  (axios.post as jest.Mock).mockRejectedValue(response);
await act(async () => {
  render(<AddMatch />, { wrapper: BrowserRouter });
});
const submitButton = screen.getByTestId("addmatchbutton");
const firstnameNode = screen.getByTestId("matchName");
const totalaudienceNode = screen.getByTestId("totalAudience");
// Confirm default state.
expect(await screen.findByText(/the thing is/i)).toBeInTheDocument();
// Click on the MUI "select" (as found by the label).
const selectLabel = /Add Players/i;
const selectEl = await screen.findByLabelText(selectLabel);

expect(selectEl).toBeInTheDocument();

userEvent.click(selectEl);
// Locate the corresponding popup (`listbox`) of options.
const optionsPopupEl = await screen.findByRole("listbox", {
  name: selectLabel,
});
// Click an option in the popup.
userEvent.click(within(optionsPopupEl).getByText(/Rohit/i));
expect(await screen.findByText(/The thing is: 0/i)).toBeInTheDocument();
userEvent.type(firstnameNode, "Pak Vs Eng");
userEvent.type(totalaudienceNode, "0");
fireEvent.click(submitButton);
await waitFor(() => {
  expect(toast.error).toHaveBeenCalled();
});
});

test("check whether Add Players button is clickable and don't worked", async () => {
  const response = {
    data: [
      {
        playerId: "f876f785-b4e1-4542-5d75-08daa055828b",
        firstName: "Rohit",
        lastName: "Sharma",
        age: 33,
        playerList: null,
      },
      {
        playerId: "08305518-c4b2-4ed5-f151-08daa1146fd2",
        firstName: "Hardik ",
        lastName: "Pandya",
        age: 28,
        playerList: null,
      },
    ],
    status: 400,
  };
  (axios.get as jest.Mock).mockRejectedValue(response);

  const component = render(<AddMatch />, { wrapper: BrowserRouter });
  const button = component.getByTestId("addmatchbutton"); //.parentElement!;
  fireEvent.click(button);
  // await waitFor(() => {
  //   const playerName = screen.getByTestId("un-orderlist");
  //   console.log("cardElement :", playerName.textContent);
  //   expect(playerName).toBeInTheDocument();
  //   // expect(playerName).toHaveTextContent("Rohit");
  //   // expect(playerName).toHaveTextContent("Hardik");
  // });
});

test("check whether Add Players button is clickable and work perfectly", async () => {
  const response = {
    data: [
      {
        playerId: "f876f785-b4e1-4542-5d75-08daa055828b",
        firstName: "Rohit",
        lastName: "Sharma",
        age: 33,
        playerList: null,
      },
      {
        playerId: "08305518-c4b2-4ed5-f151-08daa1146fd2",
        firstName: "Hardik ",
        lastName: "Pandya",
        age: 28,
        playerList: null,
      },
    ],
    status: 200,
  };
  (axios.get as jest.Mock).mockReturnValue(response);

  const component = render(<AddMatch />, { wrapper: BrowserRouter });
  const selectLabel = /Add Players/i;
  const selectEl = await screen.findByLabelText(selectLabel);

  expect(selectEl).toBeInTheDocument();

  userEvent.click(selectEl);
  // Locate the corresponding popup (`listbox`) of options.
  const optionsPopupEl = await screen.findByRole("listbox", {
    name: selectLabel,
  });
  userEvent.click(within(optionsPopupEl).getByText(/Rohit/i));  
});