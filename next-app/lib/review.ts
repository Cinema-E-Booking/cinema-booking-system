import { query } from "./database";

interface Review {
  id: number;
  customerId: number;
  movieId: number;
  // stars should be an integer between 1 and 5 inclusive
  stars: number;
  content: string;
};

type CreateReviewOpts = Omit<Review, "id">;
export async function createReview(opts: CreateReviewOpts) {
  const queryText = `
  INSERT INTO review (customer_id, movie_id, stars, content)
  VALUES ($1, $2, $3, $4)
  RETURNING id;
  `;

  const values = [opts.customerId, opts.movieId, opts.stars, opts.content];
  const res = await query(queryText, values);

  return res.rows[0].id;
}

export async function getMovieReviews(movieId: number) {
  const queryText = `
  SELECT id, customer_id, movie_id, stars, content
  FROM review
  WHERE movie_id = $1;
  `;

  const values = [movieId];
  const res = await query(queryText, values);

  const out: Review[] = [];
  for (const row of res.rows) {
    out.push({
      id: row.id,
      customerId: row.customer_id,
      movieId: row.movie_id,
      stars: row.stars,
      content: row.content,
    });
  }
  return out;
}

export async function deleteReview(reviewId: number) {
  const queryText = `
  DELETE FROM review
  WHERE id = $1;
  `;

  const values = [reviewId];
  await query(queryText, values);
}
