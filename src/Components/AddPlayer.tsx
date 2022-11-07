import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./NavBar";
import React from "react";
import { Box, Button, Container, CssBaseline, TextField } from "@mui/material";

function AddPlayer() {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const CreateNewPlayer = async () => {
    try {
      const data = {
        id: "00000000-0000-0000-0000-000000000000",
        firstName: `${playerName}`,
        lastName: `${lastName}`,
        age: `${age}`,
      };
      const response = await axios.post("https://localhost:7258/player", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("Success");
        navigate(`/player`);
        toast.success("Player Added Successful!", {
          autoClose: 1000,
          pauseOnHover: false,
          toastId: "toast-success",
        });
      }
    } catch (err) {
      console.log("err: ", err);
      toast.error("Please filled the value", {
        autoClose: 1000,
        pauseOnHover: false,
        toastId: "toast-error",
      });
    }
  };

  return (
    <div style={{ border: "3px solid black", marginTop: "20%", width: "100%" }}>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onClick={CreateNewPlayer}
            noValidate
            sx={{ mt: 1 }}
            style={{ maxWidth: "100%", marginTop: "5%" }}
          ></Box>
        </Box>
        <TextField
          margin="normal"
          required
          fullWidth
          style={{ backgroundColor: "#cbcecf" }}
          label="First Name"
          placeholder="First Name"
          onChange={(e) => {
            setPlayerName(e.target.value);
          }}
          type="text"
          autoFocus
        ></TextField>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Last name"
          type="text"
          placeholder="Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          style={{ backgroundColor: "#cbcecf" }}
        ></TextField>

        <TextField
          margin="normal"
          required
          fullWidth
          label="Age"
          style={{ backgroundColor: "#cbcecf" }}
          type="text"
          placeholder="Age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        ></TextField>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          data-testid="addplayerbutton"
        >
          AddPlayer
        </Button>
      </Container>
    </div>
  );
}

export default AddPlayer;
