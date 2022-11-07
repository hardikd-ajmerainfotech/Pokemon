import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loading({text}: any) {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
      Loading
    </Box>
  );
}

export default Loading;
