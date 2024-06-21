const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
    
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{ 
    
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            username: username
        }, 'access', { expiresIn: 60 * 60 });

        req.session.authorization = {
            accessToken: accessToken,
            username: username
        };

        return res.status(200).json({
            message: "User successfully logged in",
            accessToken: accessToken
        });
    } else {
        return res.status(401).json({ message: "Invalid credentials." });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.session.authorization.username;

    if (!isbn || !review) {
        return res.status(400).json({ message: "ISBN and review are required." });
    }

    let book = books[isbn];
    if (!book) {
        return res.status(404).json({ message: "Book not found." });
    }

    if (!book.reviews) {
        book.reviews = {};
    }

    if (book.reviews[username]) {
        book.reviews[username] = review;
    } else {
        book.reviews[username] = review;
    }

    return res.status(200).json({ message: "Review added/modified successfully." });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;
    const username = req.session.authorization.username;

    if (!isbn) {
        return res.status(400).json({ message: "ISBN parameter is required." });
    }

    let book = books[isbn];
    if (!book) {
        return res.status(404).json({ message: "Book not found." });
    }

    if (!book.reviews || !book.reviews[username]) {
        return res.status(404).json({ message: "Review not found." });
    }

    delete book.reviews[username];

    return res.status(200).json({ message: "Review deleted successfully." });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.authenticatedUser = authenticatedUser;
module.exports.users = users;
