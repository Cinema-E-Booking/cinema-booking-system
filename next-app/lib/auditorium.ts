import { query } from "./database";
import { getMovie, Movie } from "./movie";

export interface Auditorium {
  id: number;
  name: string;
  seats: Seat[];
};

export interface Seat {
  id: number;
  row: number;
  number: number;
};

export interface Screening {
  id: number;
  movie: Movie;
  auditorium: Auditorium;
  availableSeats: Seat[];
  startTime: Date;
};

export interface CreateAuditoriumOpts {
  name: string;
  seats: {
    row: number;
    number: number;
  }[]
};
export async function createAuditorium(opts: CreateAuditoriumOpts) {
  const auditoriumQueryText = `
    INSERT INTO auditorium (name)
    VALUES ($1)
    RETURNING id;
  `;
  const seatQueryText = `
    INSERT INTO seat (auditorium_id, row, number)
    VALUES ($1, $2, $3);
  `;
  
  const auditoriumValues = [opts.name];
  const auditoriumRes = await query(auditoriumQueryText, auditoriumValues);

  const auditoriumId = auditoriumRes.rows[0].id as number;

  for (const seat of opts.seats) {
    const seatValues = [auditoriumId, seat.row, seat.number];
    await query(seatQueryText, seatValues);
  }

  return auditoriumId;
};

export async function deleteAuditorium(auditoriumId: number) {
  const queryText = `
    DELETE FROM auditorium
    WHERE id = $1;
  `;

  const values = [auditoriumId];
  await query(queryText, values);

  return;
}

export async function getAuditorium(auditoriumId: number): Promise<Auditorium> {
  const auditoriumQueryText = `
    SELECT 
      id, name
    FROM auditorium
    WHERE id = $1;
  `;

  const seatQueryText = `
    SELECT
      id, row, number
    FROM seat
    WHERE auditorium_id = $1;
  `;

  const values = [auditoriumId];
  const auditoriumRes = await query(auditoriumQueryText, values);
  
  const seatRes = await query(seatQueryText, values);

  const seats: Seat[] = [];
  for (const row of seatRes.rows) {
    seats.push({
      id: row.id,
      row: row.row,
      number: row.number,
    });
  }

  return {
    id: auditoriumRes.rows[0].id,
    name: auditoriumRes.rows[0].name,
    seats: seats,
  };
}

export async function getAllAuditoriums() {
  const queryText = `
  SELECT id
  FROM auditorium
  `;

  const res = await query(queryText);

  if(res.rowCount == 0) {
      return null; // no auditoriums
  }

  return res.rows as number[];
}

export interface CreateScreeningOpts {
  movieId: number;
  auditoriumId: number;
  startTime: Date;
};
export async function createScreening(opts: CreateScreeningOpts) {
  const queryText = `
    INSERT INTO screening (movie_id, auditorium_id, start_time)
    VALUES ($1, $2, $3)
    RETURNING id;
  `;

  const values = [opts.movieId, opts.auditoriumId, opts.startTime];
  const res = await query(queryText, values);

  return res.rows[0].id as number;
};

// Helper function for getScreening
async function getAvailableSeats(screeningId: number, auditoriumId: number): Promise<Seat[]> {
  const queryText = `
    SELECT
      id, row, number
    FROM seat
    WHERE auditorium_id = $1
    AND id NOT IN (
      SELECT seat_id
      FROM ticket
      WHERE screening_id = $2
    );
  `;

  const values = [auditoriumId, screeningId];
  const res = await query(queryText, values);

  const seats: Seat[] = [];
  for (const row of res.rows) {
    seats.push({
      id: row.id,
      row: row.row,
      number: row.number,
    });
  }

  return seats;
}

export async function getScreening(screeningId: number): Promise<Screening> {
  const screeningQueryText = `
    SELECT
      id, movie_id, auditorium_id, start_time
    FROM screening
    WHERE id = $1;
  `;

  const values = [screeningId];
  const res = await query(screeningQueryText, values);

  const movie = await getMovie(res.rows[0].movie_id);
  const availableSeats = await getAvailableSeats(res.rows[0].id, res.rows[0].auditorium_id);
  const auditorium = await getAuditorium(res.rows[0].auditorium_id);

  return {
    id: res.rows[0].id,
    movie,
    auditorium,
    availableSeats,
    startTime: res.rows[0].start_time,
  };
}

// Will return all screenings for a movie.
// If futureOnly is true, it will only return upcoming screenings
export async function getMovieScreenings(movieId: number) {
  // Pretty inefficient code, but not enough movies for this to actually matter
  const queryText = `
  SELECT id FROM screening WHERE movie_id = $1;
  `
  ;

  const values = [movieId];
  const res = await query(queryText, values);

  console.log('Res: ', res)
  const screenings: Screening[] = [];
  for (const row of res.rows) {
    screenings.push(await getScreening(row.id));
    console.log('row: ', getScreening(row.id));
  }
  console.log(screenings);

  return screenings;
}

// Returns true if the created screening would conflict with an existing
// screening.
export async function screeningWouldConflict(opts: CreateScreeningOpts) {
  const queryText = `
  SELECT COUNT(1) as conflicts
  FROM screening AS s
  LEFT JOIN movie AS m
  ON m.id = s.movie_id
  WHERE
    (s.auditorium_id = $1) AND
    ($2 < s.start_time + m.duration) AND
    ($2 + (SELECT duration FROM movie WHERE id = $3) > s.start_time);
  `;

  const values = [opts.auditoriumId, opts.startTime, opts.movieId];
  const res = await query(queryText, values);

  return res.rows[0].conflicts !== 0;
}

export async function deleteSeat(seatId: number) {
  const queryText = `DELETE FROM seat WHERE id = $1`;
  const values = [seatId];
  console.log('server check:',seatId);

  const res = await query(queryText, values);
  console.log(res);

  if (res.rowCount == 1) {
    return "seat deleted";
  }
 
  return "seat not deleted";
};
