CREATE DATABASE IF NOT EXISTS Foxdeck;

USE Foxdeck;

# table containing resources like 'folder' or 'note'
CREATE TABLE IF NOT EXISTS Foxdeck.Resource
(
    resourceId       VARCHAR(36) PRIMARY KEY,
    parentResourceId VARCHAR(36),
    type             VARCHAR(20),
    name             VARCHAR(255),
    content          TEXT,
    createdAt        DATE
);

# table containing the registered users
CREATE TABLE IF NOT EXISTS Foxdeck.User
(
    id       VARCHAR(36) PRIMARY KEY,
    username VARCHAR(50),
    email    VARCHAR(50),
    password VARCHAR(255)
);

# table maps resources with users
CREATE TABLE IF NOT EXISTS Foxdeck.UserResourceAssociation
(
    id         VARCHAR(36) PRIMARY KEY,
    userId     VARCHAR(36),
    resourceId VARCHAR(36),
    FOREIGN KEY (userId) REFERENCES User(id),
    FOREIGN KEY (resourceId) REFERENCES Resource(resourceId)
);