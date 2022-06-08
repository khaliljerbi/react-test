import { useEffect, useState } from "react";
import { Stack, Typography, Box } from "@mui/material";
import Carousel, { Settings } from "react-slick";
import axios from "axios";
import MovieCard from "./MovieCard";
import { MovieFromApi } from "../../types/movie.type";

const settings: Settings = {
  lazyLoad: "progressive",
  infinite: true,
  autoplay: true,
  speed: 500,
  centerPadding: "80px",
  autoplaySpeed: 2000,
  slidesToShow: 7,
  slidesToScroll: 7,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        centerPadding: "80px",
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const TopMovie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_API}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`
      );
      setMovies(res.data.results);
    };

    getMovies();
  }, []);
  return (
    <Stack direction="column" sx={{ p: 5 }}>
      <Typography variant="h4" color="white" pb={4}>
        Les 10 meilleurs films
      </Typography>
      <Box>
        <Carousel {...settings}>
          {movies.map((movie: MovieFromApi) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              releaseDate={movie.release_date}
              image={movie.poster_path}
            />
          ))}
        </Carousel>
      </Box>
    </Stack>
  );
};

export default TopMovie;
