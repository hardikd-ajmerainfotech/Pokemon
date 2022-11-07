import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./NavBar";

function DeleteMatch() {
  const navigate = useNavigate();
  const [deleteMatchId, setDeleteMatchId] = useState("");

  const DeleteMatch =  () => {
    // const data = {
    //   name: `${deleteMatchId}`,
    // };

     axios
      .delete(`https://localhost:7258/Match/${deleteMatchId}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Success");
          navigate(`/match`);
          toast.success("Delete Match Successful !");
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
        <h1>Delete Match</h1>
      </div>
      <div style={{ marginRight: "20px" }}>
        <label>DeleteMatch</label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          onChange={(e) => {
            setDeleteMatchId(e.target.value);
          }}
        />
      </div>
      <button onClick={DeleteMatch}>DeleteMatch</button>
    </div>
  );
}

export default DeleteMatch;
