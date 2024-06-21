const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let authenticatedUser = require('./auth_users.js').authenticatedUser;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    if (!isValid(username)) {
        const userExists = authenticatedUser(username, password);
        if (userExists) {
            return res.status(409).json({ message: "User already exists." });
        }

        users.push({ username, password });
        return res.status(201).json({ message: "User successfully registered. You can now login." });
    } else {
        return res.status(400).json({ message: "Username is not valid." });
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  
    res.send(JSON.stringify(books,null,4));
});

// Get the book list available in the shop - asynch
/*public_users.get('/books', (req, res) => {

    books.getBooks()
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            console.error('Error fetching books:', err);
            res.status(500).json({ message: 'Failed to fetch books.' });
        });
}); */

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

    const isbn = req.params.isbn;
    
    if (books[isbn]) {
        res.json(books[isbn]);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// Geet book details based on ISBN - asynch
/*public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    
    books.getBookByISBN(isbn)
        .then(book => {
            res.json(book);
        })
        .catch(err => {
            console.error('Error fetching book details:', err);
            res.status(404).json({ message: "Book not found." });
        });
});*/
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  
    const author = req.params.author;
    const bookKeys = Object.keys(books); 
    
    const booksByAuthor = [];

    bookKeys.forEach(key => {
        if (books[key].author === author) {
            booksByAuthor.push({
                id: key,
                title: books[key].title,
                author: books[key].author
            });
        }
    });

    if (booksByAuthor.length > 0) {
        res.json(booksByAuthor);
    } else {
        res.status(404).json({ message: "Author not found" });
    }
});

// Get book details based on author - asynch
/*public_users.get('/author/:author', (req, res) => {

    const author = req.params.author;
    
    books.getBooksByAuthor(author)
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            console.error('Error fetching books by author:', err);
            res.status(404).json({ message: "Author not found." });
        });
});*/

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  
    const title = req.params.title;
    const bookKeys = Object.keys(books); 
    
    const booksByTitle = [];

    bookKeys.forEach(key => {
        if (books[key].title === title) {
            booksByTitle.push({
                id: key,
                title: books[key].title,
                author: books[key].author
            });
        }
    });

    if (booksByTitle.length > 0) {
        res.json(booksByTitle);
    } else {
        res.status(404).json({ message: "Title not found" });
    }
});

// Get all books based on title - asynch
/*public_users.get('/title/:title', (req, res) => {

    const title = req.params.title;
    
    books.getBooksByTitle(title)
        .then(books => {
            res.json(books);
        })
        .catch(err => {
            console.error('Error fetching books by title:', err);
            res.status(404).json({ message: "Title not found." });
        });
});*/

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  
    const isbn = req.params.isbn;

    if (books[isbn]) {
        const reviews = books[isbn].reviews;
        res.json(reviews);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports.general = public_users;
