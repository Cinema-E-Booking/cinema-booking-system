import { query } from "./database";

export interface Movie {
    movieId: number;
    title: string;
    category: string;
    rating: string;
    synopsis: string;
    trailer_url: string;
    image_url: string;
    duration: string;
  }

export type CreateMovieOpts = Omit<Movie, "movieId">;
export async function createMovie(opts: CreateMovieOpts): Promise<number> {
    const queryText = `
    INSERT INTO movie (id, title, category, rating, synopsis, trailer_url, image_url, duration)
    VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)
    RETURNING id;
    `;

    const values = [opts.title, opts.category, opts.rating, opts.synopsis, opts.trailer_url, opts.image_url, opts.duration];
    const res = await query(queryText, values);
  
    return res.rows[0].id as number;
}

export async function getAllMovies() {
    const queryText =`
    SELECT * FROM movie
    `;

    const res = await query(queryText);

    if(res.rowCount == 0) {
        return null; // no movies found
    }

    return res;
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