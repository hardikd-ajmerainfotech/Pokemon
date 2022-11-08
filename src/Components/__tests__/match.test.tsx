import "@testing-library/jest-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Match from "../Match";
import axios from "axios";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";

jest.mock("axios");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

test("check whether Navbar component Match button is clickable or not  ", () => {
  render(<Match />, { wrapper: BrowserRouter });
  const loadPlayerButton = screen.getByRole("button", {
    name: "Match",
  });
  fireEvent.click(loadPlayerButton);
  expect(loadPlayerButton).toBeInTheDocument();
});

test("check whether Load Players button is clickable or show list of data", async () => {
  const response = {
    data: [
      {
        matchId: "81706bc2-6821-4f8b-1d36-08daa0822f01",
        matchName: "Ind Vs Eng",
        releasedDate: "2022-09-27T17:47:02.1088296",
        totalAudience: 10000,
        playerList: [],
      },
      {
        matchId: "fc78a363-7d21-4f00-3837-08daa0fe9160",
        matchName: "Ind Vs Pak",
        releasedDate: "2022-09-28T08:37:24.6028325",
        totalAudience: 25000,
        playerList: [],
      },
      {
        matchId: "23a7eac0-b719-4787-1a17-08daa114bb6b",
        matchName: "Eng Vs SL",
        releasedDate: "2022-09-28T11:16:04.1932006",
        totalAudience: 2000,
        playerList: [],
      },
      {
        matchId: "cc705a83-1f3d-46b6-841c-08daa50300b1",
        matchName: "string",
        releasedDate: "2022-10-03T11:19:14.1279928",
        totalAudience: 2000,
        playerList: [],
      },
      {
        matchId: "c125d937-f2b2-4520-5bff-08daa503e2d2",
        matchName: "string",
        releasedDate: "2022-10-03T11:25:32.3432483",
        totalAudience: 10,
        playerList: [],
      },
      {
        matchId: "fdac55f5-d7ee-4446-2206-08daa5041004",
        matchName: "string",
        releasedDate: "2022-10-03T11:26:48.1013405",
        totalAudience: 10,
        playerList: [],
      },
    ],
    status: 200,
  };
  (axios.get as jest.Mock).mockReturnValue(response);

  const component = render(<Match />, { wrapper: BrowserRouter });
  // const button = component.getByTestId("loadmatches"); //.parentElement!;
  // fireEvent.click(button);
  await waitFor(() => {
    const playerName = screen.getByTestId("un-orderlist");
    console.log("cardElement :", playerName.textContent);
    expect(playerName).toBeInTheDocument();
    expect(playerName).toHaveTextContent("Ind Vs Eng");
  });
});

test("check whether Load Players button is clickable and show empty list", async () => {
  const response = {
    data: [
      {
        matchId: "81706bc2-6821-4f8b-1d36-08daa0822f01",
        matchName: "Ind Vs Eng",
        releasedDate: "2022-09-27T17:47:02.1088296",
        totalAudience: 10000,
        playerList: [],
      },
      {
        matchId: "fc78a363-7d21-4f00-3837-08daa0fe9160",
        matchName: "Ind Vs Pak",
        releasedDate: "2022-09-28T08:37:24.6028325",
        totalAudience: 25000,
        playerList: [],
      },
      {
        matchId: "23a7eac0-b719-4787-1a17-08daa114bb6b",
        matchName: "Eng Vs SL",
        releasedDate: "2022-09-28T11:16:04.1932006",
        totalAudience: 2000,
        playerList: [],
      },
      {
        matchId: "cc705a83-1f3d-46b6-841c-08daa50300b1",
        matchName: "string",
        releasedDate: "2022-10-03T11:19:14.1279928",
        totalAudience: 2000,
        playerList: [],
      },
      {
        matchId: "c125d937-f2b2-4520-5bff-08daa503e2d2",
        matchName: "string",
        releasedDate: "2022-10-03T11:25:32.3432483",
        totalAudience: 10,
        playerList: [],
      },
      {
        matchId: "fdac55f5-d7ee-4446-2206-08daa5041004",
        matchName: "string",
        releasedDate: "2022-10-03T11:26:48.1013405",
        totalAudience: 10,
        playerList: [],
      },
    ],
    status: 400,
  };
  (axios.get as jest.Mock).mockRejectedValue(response);

  const component = render(<Match />, { wrapper: BrowserRouter });
  // const button = component.getByTestId("loadmatches"); //.parentElement!;
  // fireEvent.click(button);
  await waitFor(() => {
    const playerName = screen.getByTestId("un-orderlist");
    console.log("cardElement :", playerName.textContent);
    expect(playerName).toBeInTheDocument();
    // expect(playerName).toHaveTextContent("Ind Vs Eng");
  });
});

test("should delete match successful", async () => {
  const response = {
    data: [
      {
        matchId: "81706bc2-6821-4f8b-1d36-08daa0822f01",
        matchName: "Ind Vs Eng",
        releasedDate: "2022-09-27T17:47:02.1088296",
        totalAudience: 10000,
        playerList: [],
      },
    ],
    status: 200,
  };
  (axios.get as jest.Mock).mockReturnValue(response);
  (axios.delete as jest.Mock).mockReturnValue(response);
  const component = render(<Match />, { wrapper: BrowserRouter });
  // const button = component.getByTestId("loadmatches"); //.parentElement!;
  // fireEvent.click(button);
  await waitFor(() => {
    const playerName = component.getByTestId("un-orderlist");
    const AllCards = component.getAllByTestId("card-id")[0];
    const AllDelette = AllCards.children[1] as HTMLElement;
    console.log("playerName :", playerName.textContent);
    expect(playerName).toBeInTheDocument();
  });
  const submitButtonList = screen.getAllByTestId("delete");
  console.log(submitButtonList, "submit button:");

  fireEvent.click(submitButtonList[0]);
  const clickonagreebutton = screen.getByTestId("agreebutton");
  fireEvent.click(clickonagreebutton);
 await waitFor(() => {
   expect(toast.success).toHaveBeenCalled();
 });
});

test("should delete match failed", async () => {
  const response = {
    data: [
      {
        matchId: "81706bc2-6821-4f8b-1d36-08daa0822f01",
        matchName: "Ind Vs Eng",
        releasedDate: "2022-09-27T17:47:02.1088296",
        totalAudience: 10000,
        playerList: [],
      },
    ],
    status: 200,
  };
  const response2 = {
    data: [
      {
        matchId: "81706bc2-6821-4f8b-1d36-08daa0822f01",
        matchName: "Ind Vs Eng",
        releasedDate: "2022-09-27T17:47:02.1088296",
        totalAudience: 10000,
        playerList: [],
      },
    ],
    status: 400,
  };
  (axios.get as jest.Mock).mockReturnValue(response);
  (axios.delete as jest.Mock).mockRejectedValue(response2);

  const component = render(<Match />, { wrapper: BrowserRouter });
  // const button = component.getByTestId("loadmatches"); //.parentElement!;
  // fireEvent.click(button);
  await waitFor(() => {
    const playerName = component.getByTestId("un-orderlist");
    const AllCards = component.getAllByTestId("card-id")[0];
    const AllDelette = AllCards.children[1] as HTMLElement;
    // const AllDelette = component.getAllByTestId("delete-id");
    console.log("playerName :", playerName.textContent);
    // console.log("AllCards : ", AllCards);
    // console.log("AALl Delete : ",AllDelette);

    // console.log("playerName123 :", playerName);

    expect(playerName).toBeInTheDocument();
    // expect(playerName)[0].toHaveTextContent("Ind Vs Eng");
  });
  const submitButtonList = screen.getAllByTestId("delete");
  // const submitButtonList = screen.getAllByRole(button, { name: "Delete" });
  console.log(submitButtonList, "submit button:");

  fireEvent.click(submitButtonList[0]);
  const clickonagreebutton = screen.getByTestId("agreebutton");
  fireEvent.click(clickonagreebutton);
  await waitFor(() => {
    expect(toast.error).toHaveBeenCalled();
  });
});
