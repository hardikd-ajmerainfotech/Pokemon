import "@testing-library/jest-dom";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteDialog from "../DeleteDialog";
import Loading from "../Loading";
import Navbar from "../NavBar";
import Player from "../Player";

jest.mock("axios");
interface player {
  GetPlayer: jest.Mock<any, any>;
}
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
const AllTheProviders = ({ children }: any) => {
  return (
    <BrowserRouter>
      <Navbar>
        <Loading>
          <DeleteDialog>{children}</DeleteDialog>
        </Loading>
      </Navbar>
    </BrowserRouter>
  );
};

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("first", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  afterEach(cleanup);

  // test("check player list render or not", async () => {
  //   const data = [
  //     {
  //       playerId: "f876f785-b4e1-4542-5d75-08daa055828b",
  //       firstName: "Rohit",
  //       lastName: "Sharma",
  //       age: 33,
  //       playerList: null,
  //     },
  //     {
  //       playerId: "08305518-c4b2-4ed5-f151-08daa1146fd2",
  //       firstName: "Hardik ",
  //       lastName: "Pandya",
  //       age: 28,
  //       playerList: null,
  //     },
  //   ];

  //   mockedAxios.get.mockResolvedValueOnce(data);
  //   const renderComponent = () =>
  //     render(<Player />, { wrapper: BrowserRouter });
  //   const { getByText, getAllByRole, getByTestId } = renderComponent();
  //   act(() => {
  //     const loadPlayerButton = screen.getByRole("button", {
  //       name: "Load Players",
  //     });
  //     fireEvent.click(loadPlayerButton);
  //     expect(loadPlayerButton).toBeInTheDocument();
  //   });

  //   await waitFor(() => {
  //     const userList = screen.getAllByRole("list");
  //     expect(userList).toHaveLength(1);
  //   });
  // });

  test("check whether Navbar component Match button is clickable or not  ", () => {
    render(<Player />, { wrapper: BrowserRouter });
    const loadPlayerButton = screen.getByRole("button", {
      name: "Match",
    });
    fireEvent.click(loadPlayerButton);
    expect(loadPlayerButton).toBeInTheDocument();
  });

  test("check whether Navbar component Player button is clickable or not", () => {
    render(<Player />, { wrapper: BrowserRouter });
    const loadPlayerButton = screen.getByRole("button", {
      name: "Player",
    });
    fireEvent.click(loadPlayerButton);
    expect(loadPlayerButton).toBeInTheDocument();
  });
  test("check whether Navbar component Login button is clickable or not", () => {
    render(<Player />, { wrapper: BrowserRouter });
    const loadPlayerButton = screen.getByRole("button", {
      name: "Login",
    });
    fireEvent.click(loadPlayerButton);
    expect(loadPlayerButton).toBeInTheDocument();
  });

  // test("should load players button text are render or not", () => {
  //   render(<Player />, { wrapper: BrowserRouter });
  //   expect(screen.getByTestId("loadplayers")).toBeInTheDocument();
  // });

  test("should Cricket Match App text are render on Navbar or not", () => {
    render(<Player />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("navbarAppName")).toBeInTheDocument();
  });

  test("should Player List text are visible or not render or not", () => {
    render(<Player />, { wrapper: BrowserRouter });
    expect(screen.getByTestId("playerslist")).toBeInTheDocument();
  });
});

test("check whether Load Players button is click and  it will get all players", async () => {
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

  const component = render(<Player />, { wrapper: BrowserRouter });
  // const button = component.getByTestId("loadplayers"); //.parentElement!;
  // fireEvent.click(button);
  await waitFor(() => {
    const playerName = screen.getByTestId("un-orderlist");
    // console.log("cardElement :", playerName.textContent);
    expect(playerName).toBeInTheDocument();
    expect(playerName).toHaveTextContent("Rohit");
    expect(playerName).toHaveTextContent("Hardik");
  });
});

// test("check whether Load Players button is click and player  list is not render", async () => {
//   const response = {
//     data: [
//       {
//         playerId: "f876f785-b4e1-4542-5d75-08daa055828b",
//         firstName: "Rohit",
//         lastName: "Sharma",
//         age: 33,
//         playerList: null,
//       },
//       {
//         playerId: "08305518-c4b2-4ed5-f151-08daa1146fd2",
//         firstName: "Hardik ",
//         lastName: "Pandya",
//         age: 28,
//         playerList: null,
//       },
//     ],
//     status: 404,
//   };
//   (axios.get as jest.Mock).mockRejectedValue(response);

//   const component = render(<Player />, { wrapper: BrowserRouter });
//   const button = component.getByTestId("loadplayers"); //.parentElement!;
//   fireEvent.click(button);
//   await waitFor(() => {
//     const playerName = screen.getByTestId("un-orderlist");
//     // console.log("cardElement :", playerName.textContent);
//     expect(playerName).toBeInTheDocument();
//   });
// });

test("should delete player button are worked", async () => {
  const response = {
    data: [
      {
        playerId: "f876f785-b4e1-4542-5d75-08daa055828b",
        firstName: "Rohit",
        lastName: "Sharma",
        age: 33,
        playerList: null,
      },
    ],
    status: 200,
  };
  (axios.get as jest.Mock).mockReturnValue(response);
  (axios.delete as jest.Mock).mockReturnValue(response);
  const component = render(<Player />, { wrapper: BrowserRouter });
  // const button = component.getByTestId("loadplayers"); //.parentElement!;
  // fireEvent.click(button);
  await waitFor(() => {
    const playerName = component.getByTestId("un-orderlist");
    const AllCards = component.getAllByTestId("card-id")[0];
    const AllDelette = AllCards.children[1] as HTMLElement;
    // console.log("playerName :", playerName.textContent);
    expect(playerName).toBeInTheDocument();
  });
  const submitButtonList = screen.getAllByTestId("delete");
  // console.log(submitButtonList, "submit button:");

  fireEvent.click(submitButtonList[0]);
  const clickonagreebutton = screen.getByTestId("agreebutton");
  fireEvent.click(clickonagreebutton);
  await waitFor(() => {
    expect(toast.success).toHaveBeenCalled();
  });
});

// test('should first', () => { 
//   render(<Player />, { wrapper: BrowserRouter });
//   expect(screen.getByTestId("Card-render")).toHaveStyle({})
//  })