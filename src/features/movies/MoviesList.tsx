import { FC, useEffect, useState } from "react";
import {
  Grid,
  Stack,
  Pagination,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import axios from "axios";
import DatePicker from "react-datepicker";
import MovieCard from "./MovieCard";
import { MovieFromApi } from "../../types/movie.type";

interface MoviesListProps {
  query: string;
}

const MoviesList: FC<MoviesListProps> = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState("-1");
  const [genre, setGenre] = useState([]);
  const [filter, setFilter] = useState<{
    genre?: number;
    year?: Date;
  } | null>(null);

  useEffect(() => {
    const getMovies = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_API}/discover/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&page=${page}${order ? `&sort_by=${order}` : ""}
        ${
          filter?.year
            ? `&primary_release_year=${+filter.year.getFullYear()}`
            : ""
        }
        ${filter?.genre ? `&with_genres=${filter.genre}` : ""}`
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
  }, [page, order, query, filter]);

  useEffect(() => {
    const getGenres = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_API}/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setGenre(res.data.genres);
    };
    getGenres();
  }, []);

  const handleSetOrder = (e: SelectChangeEvent<string>) => {
    setOrder(e.target.value);
  };

  const handleSelectGenre = (e: SelectChangeEvent<number>) => {
    setFilter({ ...filter, genre: e.target.value as number });
  };
  return (
    <Stack direction="column" sx={{ p: 5 }}>
      <Typography variant="h4" color="white" pb={4} pt={4}>
        Tous les films
      </Typography>
      <Stack direction={{ xs: "column", md: "row" }} pb={5}>
        <Grid container mt={2} spacing={2}>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            spacing={1}
            xs={12}
            md={6}
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
                <MenuItem value={"-1"} disabled>
                  Sélectionner l'ordre
                </MenuItem>
                <MenuItem value={"original_title.asc"}>
                  Ordre alphabétique (asc)
                </MenuItem>
                <MenuItem value={"original_title.desc"}>
                  Ordre alphabétique (desc)
                </MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            spacing={1}
            xs={12}
            md={6}
          >
            <Grid item xs={2} md={1}>
              <Typography color="#586E94">Filtrer par:</Typography>
            </Grid>
            <Grid item xs={5} md={3}>
              <Select
                fullWidth
                value={filter?.genre || -1}
                onChange={handleSelectGenre}
                sx={{
                  color: "#586E94",
                  border: "1px solid #586E94",
                  borderRadius: "20px",
                  "& .MuiSvgIcon-root": {
                    color: "#586E94",
                  },
                }}
              >
                <MenuItem value={-1} disabled>
                  Genre
                </MenuItem>
                <MenuItem value={""}>Tous</MenuItem>
                {genre.map((genre: { id: number; name: string }) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={5} md={3}>
              <DatePicker
                onChange={(date: Date) => {
                  setFilter({ ...filter, year: date });
                }}
                placeholderText="Année"
                showYearPicker
                selected={filter?.year}
                dateFormat="yyyy"
                customInput={
                  <TextField
                    fullWidth
                    placeholder="Année"
                    label=""
                    InputProps={{
                      style: {
                        color: "#586E94",
                        border: "1px solid #586E94",
                        borderRadius: "20px",
                      },
                    }}
                  />
                }
              />
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
        {movies.length > 10 && (
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
        )}
      </Stack>
    </Stack>
  );
};

export default MoviesList;
