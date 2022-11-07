import axios from "axios";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import NavBar from "./NavBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { NavLink} from "react-router-dom";
import DeleteDialog from "./DeleteDialog";

interface IMatchDTO {
  matchId: number;
  matchName: string;
  releasedDate: Date;
  totalAudience: number;
  playerList: [];
}
export function Match(): JSX.Element {
  const [responesdata, setResponesData] = useState<Array<IMatchDTO>>([]);
  const [id, setId] = useState();
  const [dataAdded, setDataAdded] = useState(Boolean);
  const [isLoading, setIsloading] = useState(false);

  const Match = async () => {
    setIsloading(true);
    try {
      const response = await axios.get("https://localhost:7258/matches", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setIsloading(false);
        setResponesData(response.data);
        setDataAdded(true);
        console.log(response.data, 53);
      }
    } catch (error) {
      console.log(error);
      console.log("1");
    }
  };
  useEffect(() => {
    Match();
  }, [dataAdded]);
  return (
    <div>
      <NavBar />
      {/* <div
       style={{
         marginTop: "10%",
         color: "rgb(22 22 20)",
         alignItems: "center",
         // width: "100%",
         justifyContent: "center",
       }}
     > */}
      {/* <div
          style={{
            marginTop: "10%",
            marginLeft: "5%",
            color: "rgb(22 22 20)",
          }}
        > */}
      <h1
        style={{
          marginTop: "100px",
          width: "100%",
          justifyContent: "center",
          display: "flex",
        }}
      >
        Matches
      </h1>
      {/* <button
            onClick={Match}
            data-testid="loadmatches"
            style={{ marginBottom: "24px", width: "120px" }}
          >
            Load Matches
          </button> */}
      <div>
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
              // justifyContent="center"
              // alignContent={"center"}
              // alignItems={"center"}
              maxWidth={"80%"}
            >
              {!isLoading &&
                responesdata.map((match) => {
                  return (
                    <li key={match.matchId}>
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
                              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtBJUqM5JOKa7w7KokFf1k3QJufJBXl4lVJA&usqp=CAU"
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                // variant="h5"
                                component="div"
                              >
                                <h6>Match Name: {match.matchName}</h6>
                                {/* <hr></hr> */}
                                Total Audience: {match.totalAudience}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <DeleteDialog
                            id={id}
                            match={match}
                            setId={setId}
                            type={`match`}
                            GetMatch={Match}
                            data-testid="delete-id"
                          />
                        </Card>
                      </Grid>
                    </li>
                  );
                })}
            </Grid>
          )}
        </ul>
      </div>

      {isLoading && <Loading />}
      {/* <ToastContainer /> */}
      <div style={{ marginTop: "-49px" }}>
        <NavLink to="/addmatch">
          <button
            style={{
              marginTop: "5%",
              marginBottom: "10%",
              marginLeft: "45%",
              color: "#9d7506",
              width: "120px",
            }}
          >
            Add Match
          </button>
        </NavLink>
      </div>
    </div>
  );
}
export default Match;
