import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Match from "./Components/Match";
import Register from "./Components/Register";
import Player from "./Components/Player";
import AddMatch from "./Components/AddMatch";
import AddPlayer from "./Components/AddPlayer";
import DeleteMatch from "./Components/DeleteMatch";
import DeletePlayer from "./Components/DeletePlayer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/match" element={<Match />} />
          <Route path="/player" element={<Player />} />
          <Route path="/addmatch" element={<AddMatch />} />
          <Route path="/addplayer" element={<AddPlayer />} />
          <Route path="/deletematch" element={<DeleteMatch />} />
          <Route path="/deleteplayer/" element={<DeletePlayer />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
