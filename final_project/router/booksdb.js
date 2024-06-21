let books = {
      1: {"author": "Chinua Achebe","title": "Things Fall Apart", "reviews": {} },
      2: {"author": "Hans Christian Andersen","title": "Fairy tales", "reviews": {} },
      3: {"author": "Dante Alighieri","title": "The Divine Comedy", "reviews": {} },
      4: {"author": "Unknown","title": "The Epic Of Gilgamesh", "reviews": {} },
      5: {"author": "Unknown","title": "The Book Of Job", "reviews": {} },
      6: {"author": "Unknown","title": "One Thousand and One Nights", "reviews": {} },
      7: {"author": "Unknown","title": "Nj\u00e1l's Saga", "reviews": {} },
      8: {"author": "Jane Austen","title": "Pride and Prejudice", "reviews": {} },
      9: {"author": "Honor\u00e9 de Balzac","title": "Le P\u00e8re Goriot", "reviews": {} },
      10: {"author": "Samuel Beckett","title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}

function getBooks() {

    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            resolve(books);
        }, 5000);
    });
}

function getBookByISBN(isbn) {

    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            if (books[isbn]) {
                resolve(books[isbn]);
            } else {
                reject({ message: "Book not found" });
            }
        }, 5000); 
    });
}

function getBooksByAuthor(author) {
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            const filteredBooks = Object.values(books).filter(book => book.author === author);
            if (filteredBooks.length > 0) {
                resolve(filteredBooks);
            } else {
                reject({ message: "Books by author not found" });
            }
        }, 5000); 
    });
}

function getBooksByTitle(title) {
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            const filteredBooks = Object.values(books).filter(book => book.title === title);
            if (filteredBooks.length > 0) {
                resolve(filteredBooks);
            } else {
                reject({ message: "Books by title not found" });
            }
        }, 5000);
    });
}

module.exports = { getBooks: getBooks, getBookByISBN: getBookByISBN, getBooksByAuthor: getBooksByAuthor, getBooksByTitle: getBooksByTitle };
module.exports=books;
