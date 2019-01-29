\connect sample

CREATE SCHEMA sample_user AUTHORIZATION sample_user;

CREATE TABLE sample_user.users
(
  user_identifier   BIGINT      NOT NULL PRIMARY KEY,
  name              VARCHAR(255) NOT NULL,
  created_at        TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP
);
