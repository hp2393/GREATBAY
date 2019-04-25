DROP DATABASE IF EXISTS greatBay_db;
CREATE DATABASE greatBay_db;

USE greatBay_db;

CREATE TABLE auctions(
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  bid INT default 0,
--   starting_bid INT default 0,
--   highest_bid INT default 0,
  PRIMARY KEY (id)
);