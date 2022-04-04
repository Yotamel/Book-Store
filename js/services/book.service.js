'use strict'
const STORAGE_KEY = 'bookDB';
var gNames = ['Harry Potter 1', 'Pride and Prejudice', 'Star Wars Comic', 'Crime and Punishment', 'History of Mankind', 'Farenheit 451', 'Lord of the Flies', 'Lorem Ipsum', 'Art Made Easy']
var gBooks;

_createBooks()

function getBooks() {
    return gBooks
}

function deleteBook(bookid) {
    const bookIdx = gBooks.findIndex(book => bookid === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function addBook(name, price) {
    gBooks.push(_createBook(name, price))
    _saveBooksToStorage();
}

function updatePrice(id, price) {
    const book = gBooks.find(book => id === book.id)
    book.price = price
    _saveBooksToStorage();
}

function updateRating(id, action) {
    const book = gBooks.find(book => id === book.id)
    if(action === "+" && book.rating === 10 || action === "-" && book.rating === 0) return
    action === "+"? book.rating++ : book.rating--
    _saveBooksToStorage();
}

function _createBook(name, price = null) {
    return {
        id: 'B' + makeId(),
        name,
        price: !price ? getRandomIntInclusive(8, 50) : price,
        imgUrl: `${name}.jpg`,
        rating: 2
    }
}


function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []

        for (let i = 0; i < gNames.length; i++) {
            var name = gNames[i]
            books.push(_createBook(name))
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}

function getBookById(id) {
    const book = gBooks.find(book => id === book.id)
    return book

}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

