import { Stack, Typography } from "@mui/material";
import { FC, memo } from "react";
import { Movie } from "../../types/movie.type";

interface MovieCardProps extends Movie {}

const MovieCard: FC<MovieCardProps> = ({ title, image, releaseDate }) => {
  return (
    <Stack direction="column">
      <img
        src={`${process.env.REACT_APP_IMAGE_BASE_PATH}${image}`}
        alt={title}
        loading="lazy"
        width="138px"
        height="200px"
        style={{ borderRadius: "10px", flexShrink: 0 }}
        onError={(e) => {
          e.currentTarget.src = "/no_image.png";
        }}
      />
      <Typography
        sx={{
          maxWidth: "150px",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden",
        }}
        variant="body1"
        color="white"
        pt={2}
      >
        {title}
      </Typography>
      <Typography variant="body2" color="#D8D8D8" pb={3}>
        {new Date(releaseDate).getFullYear()}
      </Typography>
    </Stack>
  );
};

export default memo(MovieCard);
