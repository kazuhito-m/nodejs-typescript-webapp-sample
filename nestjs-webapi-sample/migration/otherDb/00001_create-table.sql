CREATE SCHEMA operation AUTHORIZATION other_user;

CREATE SEQUENCE operation.operation_histories_seq;

CREATE TABLE operation.operation_histories
(
    operation_history_identifier BIGINT NOT NULL PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
