export interface Movie {
  id: number;
  title: string;
  image: string;
  releaseDate: string;
}

export interface MovieFromApi {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}
