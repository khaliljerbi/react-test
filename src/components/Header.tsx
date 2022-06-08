import { Stack, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FC, ChangeEvent, useTransition } from "react";

interface HeaderProps {
  query: string;
  setQuery: (q: string) => void;
}

const Header: FC<HeaderProps> = ({ query, setQuery }) => {
  const [, startTrasition] = useTransition();
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="space-between"
      pl={5}
      pr={5}
      pt={3}
      spacing={1}
    >
      <img src="/logo.svg" alt="logo_moviefinder" />
      <TextField
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          startTrasition(() => {
            setQuery(e.target.value);
          });
        }}
        focused
        placeholder="Rechercher un film..."
        InputProps={{
          style: {
            color: "white",
            borderRadius: "10px",
          },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" edge="end">
                <SearchIcon sx={{ color: "#2586FA" }} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export default Header;
