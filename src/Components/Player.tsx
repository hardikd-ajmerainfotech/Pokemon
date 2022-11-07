import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import NavBar from "./NavBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import DeleteDialog from "./DeleteDialog";
import { NavLink } from "react-router-dom";

interface IPlayerDTO {
  playerId: number;
  firstName: string;
  lastName: string;
  age: number;
  playerList: [];
}

function Player(): JSX.Element {
  const [responesdata, setResponesData] = useState<Array<IPlayerDTO>>([]);
  const [dataAdded, setDataAdded] = useState<Boolean>(false);
  const [id, setId] = useState();
  const [isLoading, setIsloading] = useState(false);

  const GetPlayer: any = async () => {
    setIsloading(true);
    try {
      const response = await axios.get("https://localhost:7258/player", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        console.log("response : ", response);
        setIsloading(false);
        setResponesData(response.data);
        setDataAdded(true);
        console.log("2");
      }
    } catch (error) {
      console.log(error);
      console.log("1");
    }
  };
  useEffect(() => {
    GetPlayer();
  }, [dataAdded]);

  return (
    <>
      <div>
        {/* <Protected /> */}
        <NavBar />
        <h1
          data-testid="playerslist"
          style={{
            marginTop: "100px",
            width: "100%",
            justifyContent: "center",
            display: "flex",
          }}
        >
          Players List
        </h1>
        {/* <button
            onClick={GetPlayer}
            data-testid="loadplayers"
            style={{ marginBottom: "24px", width: "120px" }}
          >
            Load Players
          </button> */}
        <ul
          data-testid="un-orderlist"
          style={{
            listStyle: "none",
            marginTop: "18px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {responesdata && responesdata.length > 0 && (
            <Grid
              item
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              data-testid="Grid"
              maxWidth={"80%"}
            >
              {!isLoading &&
                responesdata.map((user) => {
                  return (
                    <li key={user.playerId}>
                      <Grid
                        item
                        xs={30}
                        data-testid="Card-render"
                        style={{ textAlign: "center", padding: "20px" }}
                      >
                        <Card
                          sx={{ maxWidth: 255 }}
                          style={{
                            marginTop: "10",
                            backgroundColor: "rgb(195 186 169)",
                            width: "400px",
                          }}
                          data-testid="card-id"
                        >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPBakqttLTK79X9H3xPQ9SDfRrHMgRKspmqA&usqp=CAU"
                              alt="player photo not avaliable"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                // variant="h5"
                                component="div"
                                data-testid="card-item"
                              >
                                <div>First Name: {user.firstName}</div>
                                <div>Last Name: {user.lastName}</div>
                                <div>Age:{user.age}</div>
                              </Typography>
                            </CardContent>
                            <DeleteDialog
                              id={id}
                              user={user}
                              setId={setId}
                              type={`player`}
                              data-testid="delete-id"
                              GetPlayer={GetPlayer}
                              // GetPlayer={GetPlayer}
                            />
                          </CardActionArea>
                        </Card>
                      </Grid>
                    </li>
                  );
                })}
            </Grid>
          )}
        </ul>
        {isLoading && <Loading text={`Loading Data`} data-testId="loading" />}
      </div>
      <div style={{ marginTop: "-49px" }}>
        <NavLink to="/addplayer">
          <button
            style={{
              marginTop: "60px",
              marginLeft: "45%",
              color: "#9d7506",
              width: "120px",
            }}
          >
            Add Player
          </button>
        </NavLink>
      </div>
    </>
  );
}

export default Player;
