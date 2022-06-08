import { FC, useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Pagination,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import MovieCard from "./MovieCard";
import { MovieFromApi } from "../../types/movie.type";

interface MoviesListProps {
  query: string;
}

const MoviesList: FC<MoviesListProps> = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_API}/discover/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&page=${page}${order ? `&sort_by=${order}` : ""}`
      );
      setMovies(res.data.results);
    };

    const searchMovies = async (q: string) => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_API}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&query=${q}`
      );
      setMovies(res.data.results);
    };

    if (query) {
      searchMovies(query);
    } else {
      getMovies();
    }
  }, [page, order, query]);

  const handleSetOrder = (e: SelectChangeEvent<string>) => {
    setOrder(e.target.value);
  };
  return (
    <Stack direction="column" sx={{ p: 5 }}>
      <Typography variant="h4" color="white" pb={4} pt={4}>
        Tous les films
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} pb={5}>
        <Grid container mt={2}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item xs={2} md={1}>
              <Typography color="#586E94">Trier par:</Typography>
            </Grid>
            <Grid item xs={10} md={3}>
              <Select
                fullWidth
                onChange={handleSetOrder}
                value={order}
                sx={{
                  color: "#586E94",
                  border: "1px solid #586E94",
                  borderRadius: "20px",
                  "& .MuiSvgIcon-root": {
                    color: "#586E94",
                  },
                }}
              >
                <MenuItem value={""}></MenuItem>
                <MenuItem value={"original_title.asc"}>
                  Ordre alphabétique ASC
                </MenuItem>
                <MenuItem value={"original_title.desc"}>
                  Ordre alphabétique DESC
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </Stack>

      <Stack direction="column" justifyContent="center" alignItems="center">
        <Grid
          container
          columns={{ xs: 2, md: 6, xl: 10 }}
          direction="row"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          width="100%"
        >
          {movies.map((movie: MovieFromApi) => (
            <Grid item xs={1} key={movie.id}>
              <MovieCard
                id={movie.id}
                title={movie.title}
                releaseDate={movie.release_date}
                image={movie.poster_path}
              />
            </Grid>
          ))}
        </Grid>
        <Pagination
          onChange={(_, page) => setPage(page)}
          count={10}
          variant="outlined"
          shape="rounded"
          sx={{
            pt: 2,
            pb: 2,
            button: {
              color: "#D8D8D8",
              borderColor: "#D8D8D8",
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default MoviesList;
