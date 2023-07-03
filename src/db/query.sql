CREATE TABLE Users (
  UserID INT PRIMARY KEY,
  Name VARCHAR(255),
  Username VARCHAR(255),
  Email VARCHAR(255)
);

CREATE INDEX idx_Users_Name ON Users(Name);

CREATE TABLE CarbonFootprint (
  ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  UserID INT,
  Q1 INT,
  Q2 INT,
  Q3 INT,
  Q4 INT,
  CONSTRAINT FK_CarbonFootprint_UserID
    FOREIGN KEY (UserID)
    REFERENCES Users(UserID)
);

CREATE TABLE Badge (
  UserID INT,
  Badge1 INT,
  Badge2 INT,
  Badge3 INT,
  Badge4 INT,
  CONSTRAINT FK_Badge_UserID
    FOREIGN KEY (UserID)
    REFERENCES Users(UserID)
);

CREATE TABLE Blogs (
  BlogID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  UserID INT NOT NULL,
  Author VARCHAR(255),
  Date DATE,
  Title TEXT NOT NULL,
  Description TEXT,
  Image_url VARCHAR(255),
  Content TEXT,
  Category VARCHAR(255),
  Likes INT,
  CONSTRAINT FK_Blogs_UserID
    FOREIGN KEY (UserID)
    REFERENCES Users(UserID)
);