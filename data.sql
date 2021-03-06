CREATE TABLE companies (
  handle text PRIMARY KEY,
  name text NOT NULL,
  num_employees integer,
  description text,
  logo_url text
);
CREATE TABLE jobs (
  id serial PRIMARY KEY,
  title text NOT NULL,
  salary float NOT NULL,
  equity float NOT NULL,
  company_handle text NOT NULL REFERENCES companies ON DELETE CASCADE,
  date_posted timestamp DEFAULT current_timestamp

);


CREATE TABLE users(
    username TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    photo_url TEXT,
    is_admin BOOLEAN NOT NULL default FALSE
);

CREATE TABLE applications(
    username TEXT NOT NULL REFERENCES users ON DELETE CASCADE,
    job_id INTEGER  REFERENCES jobs ON DELETE CASCADE,
    state TEXT,
    created_at TIMESTAMP DEFAULT current_timestamp,
    PRIMARY KEY(username, job_id)
);


-- INSERT INTO companies
--   VALUES ('apple', 'Apple Computer', 200, null, null),
--          ('pixar', 'Pixar Animation Studios', 3000, 'the best', null),
--          ('ibm', 'IBM', 10, 'not a lot of employees', 'ibm.com');

-- INSERT INTO jobs (title, salary, equity, company_handle)
--   VALUES ( 'developer', 200000, .1, 'pixar'),
--          ( 'animator', 100000, 0.05, 'pixar');

