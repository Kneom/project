DROP TABLE IF EXISTS users;
CREATE TABLE users
(
    user_id TEXT PRIMARY KEY,
    password TEXT NOT NULL,
    is_admin BOOLEAN
);
DROP TABLE IF EXISTS Leaderboard;

CREATE TABLE Leaderboard (
    player TEXT,
    Time INTEGER,
    round TEXT
);

DROP TABLE IF EXISTS Rounds;
CREATE TABLE Rounds (
    round TEXT NOT NULL
);
INSERT INTO Rounds (round) VALUES
    ('1'),
    ('2'),
    ('3'),
    ('4'),
    ('5');