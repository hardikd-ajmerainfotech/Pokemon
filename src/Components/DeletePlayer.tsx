import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./NavBar";

function DeletePlayer() {
  const navigate = useNavigate();
  const [deletePlayerId, setDeletePlayerId] = useState("");

  const DeletePlayer =  () => {
    // const data = {
    //   name: `${deletePlayerId}`,
    // };

     axios
      .delete(`https://localhost:7258/Players/delete/${deletePlayerId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Success");
          navigate(`/player`);
          toast.success("Delete Player Successful!");
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  return (
    <div>
      {/* <Protected/> */}
      <Navbar />
      <div style={{ marginTop: "40vh" }}>
        <h1>Delete Player</h1>
      </div>
      <div style={{ marginRight: "20px" }}>
        <label>DeletePlayer</label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          onChange={(e) => {
            setDeletePlayerId(e.target.value);
          }}
        />
      </div>
      <button onClick={DeletePlayer}>DeletePlayer</button>
    </div>
  );
}

export default DeletePlayer;
