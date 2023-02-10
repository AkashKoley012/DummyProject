-- Active: 1675826974848@@dummy-db.cnwoz6cie7ex.ap-northeast-1.rds.amazonaws.com@3306

CREATE DATABASE DummyDB;

SHOW DATABASES;

CREATE TABLE
    Users (
        userId INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(60) NOT NULL,
        email VARCHAR(60) UNIQUE NOT NULL,
        phone VARCHAR(40) NOT NULL,
        password VARCHAR(60) NOT NULL
    );

SELECT * FROM Users WHERE name LIKE "Test1%";

DELETE FROM users WHERE userId = 1;