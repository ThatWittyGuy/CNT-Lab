CREATE DATABASE bookstore;
USE bookstore;
CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255));

CREATE TABLE books (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), author VARCHAR(255), price DECIMAL(10,2));
INSERT INTO books (title, author, price) VALUES('The Alchemist', 'Paulo Coelho', 10.99),
('1984', 'George Orwell', 8.99),('Rich Dad Poor Dad', 'Robert Kiyosaki', 12.50);
