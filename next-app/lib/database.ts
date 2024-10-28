import { Pool } from 'pg';
const pool = new Pool();

export const query: Pool["query"] = ((text, params, callback) => pool.query(text, params, callback)) as Pool["query"];

export const getClient = () => {
  return pool.connect();
}


const schema = `
DO $$ BEGIN
  CREATE TYPE customer_state AS enum ('active', 'inactive', 'suspended');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;


DO $$ BEGIN
  CREATE TYPE ticket_type AS enum ('adult', 'senior', 'child');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;


DO $$ BEGIN
  CREATE TYPE film_rating AS enum ('nr', 'g', 'pg', 'pg-13', 'r', 'nc-17');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS verification_token
(
  identifier TEXT NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  token TEXT NOT NULL,
 
  PRIMARY KEY (identifier, token)
);
 
CREATE TABLE IF NOT EXISTS accounts
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  "providerAccountId" VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  id_token TEXT,
  scope TEXT,
  session_state TEXT,
  token_type TEXT,
 
  PRIMARY KEY (id)
);
 
CREATE TABLE IF NOT EXISTS sessions
(
  id SERIAL,
  "userId" INTEGER NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  "sessionToken" VARCHAR(255) NOT NULL,
 
  PRIMARY KEY (id)
);
 
CREATE TABLE IF NOT EXISTS users
(
  id SERIAL,
  name VARCHAR(255),
  email VARCHAR(255),
  "emailVerified" TIMESTAMPTZ,
  image TEXT,
 
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS account (
  id SERIAL PRIMARY KEY,
  password_hash BYTEA NOT NULL
);

CREATE TABLE IF NOT EXISTS admin (
  account_id INT PRIMARY KEY REFERENCES account(id),
  employee_id TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS customer (
  account_id INT PRIMARY KEY REFERENCES account(id),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  state customer_state NOT NULL,
  wants_promotions BOOLEAN NOT NULL,
  billing_address TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS payment_method (
  id SERIAL PRIMARY KEY,
  card_owner_id INT NOT NULL REFERENCES account(id),
  card_number BYTEA NOT NULL,
  card_number_last_four CHAR(4) NOT NULL,
  expiration_date DATE NOT NULL,

  UNIQUE (card_owner_id, card_number)
);

CREATE TABLE IF NOT EXISTS movie (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  rating film_rating NOT NULL,
  synopsis TEXT NOT NULL,
  trailer_url TEXT NOT NULL,
  image_url TEXT NOT NULL,
  duration INTERVAL NOT NULL
);

CREATE TABLE IF NOT EXISTS theater (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS showroom (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  theater_id INT NOT NULL REFERENCES theater(id),
  seat_count INT NOT NULL
);

CREATE TABLE IF NOT EXISTS showing (
  id SERIAL PRIMARY KEY,
  showroom_id INTEGER NOT NULL REFERENCES showroom(id),
  movie_id INTEGER NOT NULL REFERENCES movie(id),
  start_time TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS promotion (
  code TEXT PRIMARY KEY,
  percent_off INTEGER NOT NULL CHECK (0 < percent_off AND percent_off < 101),
  end_time TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS booking (
  id SERIAL PRIMARY KEY,
  customer_id INT NOT NULL REFERENCES account(id),
  promotion_code TEXT REFERENCES promotion(code)
);

CREATE TABLE IF NOT EXISTS ticket (
  id SERIAL PRIMARY KEY,
  showing_id INT NOT NULL REFERENCES showing(id),
  seat_number INT NOT NULL,
  tick_type ticket_type NOT NULL,

  UNIQUE (showing_id, seat_number)
);

CREATE TABLE IF NOT EXISTS booked_ticket (
  booking_id INT NOT NULL REFERENCES booking(id),
  ticket_id INT NOT NULL REFERENCES ticket(id),
  
  PRIMARY KEY (booking_id, ticket_id)
);
`;
query(schema).catch(err => console.error(err))
