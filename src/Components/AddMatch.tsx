import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./NavBar";
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
  Typography,
} from "@mui/material";

function AddMatch() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    matchName: "",
    totalAudience: "",
    players: [{ playerId: 0 }],
  });
  const mockPlayer = {
    playerId: 0,
    firstName: "Rohit",
    lastName: "virat",
    age: 25,
  };
  const [players, setPlayers] = useState([mockPlayer]);
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    fetchPlayer();
  }, []);
  const fetchPlayer = async () => {
    try {
      const url = "https://localhost:7258/player";
      const response = await axios.get(url);
      if (response.status === 200) {
        setPlayers(response.data);
      }
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };
  const handleChange = (event: { target: { name: string; value: any } }) => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("value: ", value);
    console.log("name", name);
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (event: { preventDefault: any }) => {
    event.preventDefault();
    // if (
    //   inputs.matchName.trim() === "" ||
    //   inputs.totalAudience !== 0 ||
    //   inputs.players.length < 2
    // ) {
    //   alert("Please enter all values");
    // }
    // else {
    console.log("inputs", inputs);

    let tempPlayerList: {}[] = [];
    inputs.players.forEach((player) => {
      console.log("player: ", player);
      const tempPlayer = { playerId: player };
      tempPlayerList.push(tempPlayer);
      console.log("tempPlayerList", tempPlayerList);
    });
    console.log("tempPlayerList: ", tempPlayerList);
    const matchObject = {
      matchName: inputs.matchName,
      totalAudience: inputs.totalAudience,
      playerList: tempPlayerList,
    };
    console.log("movieObject: ", matchObject);
    try {
      const url = "https://localhost:7258/match";
      const response = await axios.post(url, matchObject);
      if (response.status === 200) {
        console.log("Success");
        navigate(`/match`);
        toast.success("Match Added !", {
          autoClose: 2000,
          pauseOnHover: false,
          toastId: "toast-success",
        });
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Match Not Added !", {
        autoClose: 2000,
        pauseOnHover: false,
        toastId: "toast-error",
      });
    }
    // }
  };
  const handleChangePlayer = (event: { target: any }) => {
    console.log("event.target.value: ", event.target.value);
    setPlayerList(event.target.value);
    handleChange(event);
  };
  return (
    <>
      <div style={{border: "2px solid black", marginTop: "20%", width: "100%"}}>
        {/* <Protected /> */}
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
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
              style={{ maxWidth: "100%", marginTop: "5%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="matchName"
                label="Match Name"
                name="matchName"
                onChange={handleChange}
                autoFocus
                data-testid="matchName"
                style={{ backgroundColor: "#cbcecf" }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                data-testid="totalAudience"
                name="totalAudience"
                label="Total Audience"
                type="string"
                id="totalAudience"
                onChange={handleChange}
                style={{ backgroundColor: "#cbcecf" }}
              />

              <FormControl
                sx={{
                  mt: 1,
                  minWidth: "100%",
                  maxWidth: "100%",
                  backgroundColor: "#cbcecf",
                }}
              >
                <InputLabel id="demo-simple-select-helper-label" required>
                  Add Players
                </InputLabel>
                <Select
                  multiple
                  required
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  name="players"
                  value={playerList}
                  data-testid="players"
                  label="Add Players"
                  onChange={handleChangePlayer}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {players.map((player) => (
                    <MenuItem value={player.playerId} key={player.playerId}>
                      {player.firstName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box sx={{ padding: 2 }}>
                <Typography>The thing is: {playerList}</Typography>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                data-testid="addmatchbutton"
              >
                Add Match
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
}
export default AddMatch;
