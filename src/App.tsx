import { CssBaseline, Box, Divider, Stack } from "@mui/material";
import { useState } from "react";
import Header from "./components/Header";
import MoviesList from "./features/movies/MoviesList";
import TopMovie from "./features/movies/TopMovie";

function App() {
  const [query, setQuery] = useState("");
  return (
    <Box
      sx={{
        bgcolor: "#0D1D37",
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CssBaseline />
      <Stack direction="column" height="100%" width="100%">
        <Header query={query} setQuery={setQuery} />
        <TopMovie />
        <Divider color="gray" variant="middle" />
        <MoviesList query={query} />
      </Stack>
    </Box>
  );
}

export default App;
