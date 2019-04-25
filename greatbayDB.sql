-- Drops the greatbay_db if it exists currently --
DROP DATABASE IF EXISTS greatbay_db;
-- Creates the "greatbay_db" database --
CREATE DATABASE greatbay_db;

-- Makes it so all of the following code will affect greatbay_db --
USE greatbay_db;

-- Creates the table "people" within greatbay_db --
CREATE TABLE greatbay (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INTEGER(10) AUTO_INCREMENT NOT NULL,
  -- Makes a string column called "title" which cannot contain null --
  objectName VARCHAR(30) NOT NULL,
  -- Makes a sting column called "artist" --
  category VARCHAR(30) NOT NULL,
  -- Makes an numeric column called "pet_age" --
  bid INTEGER(10) NOT NULL,
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO greatbay (objectName, category, bid)
VALUES ("Mazda Miata", "Car", 250);



SELECT * FROM greatbay;