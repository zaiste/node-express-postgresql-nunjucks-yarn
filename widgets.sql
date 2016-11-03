DROP DATABASE IF EXISTS widgets;
CREATE DATABASE widgets;

\c widgets;

CREATE TABLE widgets (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  amount INTEGER
);

INSERT INTO widgets (name, amount)
  VALUES ('Widget 1', 33), ('Widget 2', 55), ('Widget 3', 88);
