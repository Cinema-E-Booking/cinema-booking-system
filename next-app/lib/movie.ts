import { query } from "./database";

export type FilmRating = "nr" | "g" | "pg" | "pg-13" | "r" | "nc-17";

export interface Movie {
  movieId: number;
  title: string;
  category: string;
  rating: FilmRating;
  synopsis: string;
  trailer_url: string;
  image_url: string;
  duration: string;
  director: string;
  producer: string;
  cast: string[];
}

export type CreateMovieOpts = Omit<Movie, "movieId">;
export async function createMovie(opts: CreateMovieOpts): Promise<number> {
  const queryText = `
  INSERT INTO movie (
    id,
    title,
    category,
    rating,
    synopsis,
    trailer_url,
    image_url,
    duration,
    director,
    producer,
    cast
  )
  VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  RETURNING id;
  `;

  const values = [
    opts.title,
    opts.category,
    opts.rating,
    opts.synopsis,
    opts.trailer_url,
    opts.image_url,
    opts.duration,
    opts.director,
    opts.producer,
    opts.cast,
  ];
  const res = await query(queryText, values);

  return res.rows[0].id as number;
}

export async function getMovie(movieId: number): Promise<Movie> {
  const queryText = `
    SELECT
      id,
      title,
      category,
      rating,
      synopsis,
      trailer_url,
      image_url,
      duration,
      director,
      producer,
      cast
    FROM movie
    WHERE id = $1;
  `;

  const values = [movieId];
  const res = await query(queryText, values);

  return {
    movieId: res.rows[0].id,
    title: res.rows[0].title,
    category: res.rows[0].category,
    rating: res.rows[0].rating,
    synopsis: res.rows[0].synopsis,
    trailer_url: res.rows[0].trailer_url,
    image_url: res.rows[0].image_url,
    duration: res.rows[0].duration,
    director: res.rows[0].director,
    producer: res.rows[0].producer,
    cast: res.rows[0].cast,
  };
};

export async function searchMovies(title: string): Promise<Movie> {
  const queryText = `
    SELECT
      title,
      id,
      category,
      rating,
      synopsis,
      trailer_url,
      image_url,
      duration,
      director,
      producer,
      cast
    FROM movie
    WHERE title = $1;
  `;

  const values = [title];
  const res = await query(queryText, values);

  return {
    movieId: res.rows[0].id,
    title: res.rows[0].title,
    category: res.rows[0].category,
    rating: res.rows[0].rating,
    synopsis: res.rows[0].synopsis,
    trailer_url: res.rows[0].trailer_url,
    image_url: res.rows[0].image_url,
    duration: res.rows[0].duration,
    director: res.rows[0].director,
    producer: res.rows[0].producer,
    cast: res.rows[0].cast,
  };
};

export async function searchRating(rating: string) {
  const queryText = `
    SELECT
      rating, title, id, category, synopsis, trailer_url, image_url, duration
    FROM movie
    WHERE rating = $1;
  `;

  const values = [rating];
  const res = await query(queryText, values);
  console.log('rating search database check:', res);

  if(res.rowCount == 0) {
    return null; // no movies found
  }

  const data = {
    rowCount: res.rowCount,
    movies: res.rows.map((row) => Object.values(row)),
  };
  //console.log(data.movies);

  return data;
};

export async function getAllMovies() {
    const queryText = `
    SELECT id, title, category, rating, synopsis, trailer_url, image_url, duration
    FROM movie
    `;

    const res = await query(queryText);
    //console.log('Databse response:', res);
    //console.log('row Count:', res.rowCount);  

    if(res.rowCount == 0) {
        return null; // no movies found
    }

    const data: Movie[] = [];
    for (const row of res.rows) {
      data.push({
        movieId: row.id,
        title: row.title,
        category: row.category,
        rating: row.rating,
        synopsis: row.synopsis,
        trailer_url: row.trailer_url,
        image_url: row.image_url,
        duration: row.duration,
        director: row.director,
        producer: row.producer,
        cast: row.cast,
    });
  }
  
    return data;
}



export async function getNowShowing() {
    const queryText = `
    SELECT title, category, rating, synopsis, trailer_url, image_url, duration
    FROM movie
    WHERE movie.category = $2;
    `;
  
    const values = ['Now Showing'];
    const res = await query(queryText, values);
  
    if (res.rowCount === 0) {
      return null; // No user found
    }
  
    return res;
  }

export interface GetMoviesOpts {
  title: string;
  showingAfter: Date;
  showingBefore: Date;
  category: string;
  limit: number;
}
export async function getMovies(opts: Partial<GetMoviesOpts>) {
  const queryText = `
  SELECT
    m.id,
    m.title,
    m.category,
    m.rating,
    m.synopsis,
    m.trailer_url,
    m.image_url,
    m.duration,
    m.director,
    m.producer,
    m.cast
  FROM movie
  WHERE
    (($2 IS NULL) OR ($2 % m.title)) AND
    (($3 IS NULL) OR ($3 = m.category)) AND
    (($4 IS NULL) OR (m.id IN (
      SELECT s.id FROM screening AS s WHERE $4 <= s.start_time
    )) AND 
    (($5 IS NULL) OR (m.id IN (
      SELECT s.id FROM screening AS s WHERE $5 >= (s.start_time + m.duration)
    ))
  LIMIT coalesce($1, 25);
  `;

  const values = [
    opts.limit,
    opts.title, 
    opts.category,
    opts.showingAfter,
    opts.showingBefore,
  ];

  const res = await query(queryText, values);

  const out: Movie[] = [];
  for (const row of res.rows) {
    out.push({
      movieId: row.id,
      title: row.title,
      category: row.category,
      rating: row.rating,
      synopsis: row.synopsis,
      trailer_url: row.trailer_url,
      image_url: row.image_url,
      duration: row.duration,
      director: row.director,
      producer: row.producer,
      cast: row.cast,
    });
  }

  return out;
};

export async function deleteMovie(movieId: number) {
  const queryText = `DELETE FROM movie WHERE id = $1`;
  const values = [movieId];
  console.log('server check:',movieId);

  const res = await query(queryText, values);
  console.log(res);

  if (res.rowCount == 1) {
    return "Movie deleted";
  }
 
  return "Movie not deleted";
}
