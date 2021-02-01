'use strict';


const KEY = 'books';
const IDX_KEY = 'gIdx';
var gBooks;
var gIdx;


function getIdx() {
    var idx = loadFromStorage(IDX_KEY);
    gIdx = idx;
    return gIdx;
}

function getBooks() {
    return gBooks;
}

function sortById(){
    var books = gBooks.sort(function (book1, book2) {
        return book1.id - book2.id;
    });
    _saveToStorage();
    return books;
}

function sortByPrice() {
    var books = gBooks.sort(function (book1, book2) {
        return book1.price - book2.price;
    });
    _saveToStorage();
    return books;
}
function sortByName() {
    var books = gBooks.sort(function (book1, book2) {
        if (book1.name.toLowerCase() > book2.name.toLowerCase()) {
            return 1;
        }
        if (book1.name.toLowerCase() < book2.name.toLowerCase()) {
            return -1;
        }
        return 0;
    })
    return books;
}

function addBook(name, price) {
    var book = _createBook(name, price)
    gBooks.push(book)
    _saveToStorage();
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return +bookId === +book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveToStorage();
    gIdx = gBooks.length;
    _saveIdxToStorage();
    _updateId();
}
function _updateId(){
    var idx = 1;
    gBooks.forEach(function (book){
        book.id = idx;
        idx++;
    });
}
function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return book.id === +bookId;
    })
    return book;
}

function findBookByName(name) {
    var book = gBooks.find(function (book) {
        return book.name === name;
    })
    return book;
}

function updateBook(bookId, newPrice) {
    var book = gBooks.find(function (book) {
        return book.id === +bookId;
    })
    book.price = newPrice;
    _saveToStorage();
}

function updateRating(plusOrMinus, book) {
    if (plusOrMinus === '+' && book.rating < 10) book.rating++;
    else if (plusOrMinus === '−' && book.rating > 0) book.rating--;
    _saveToStorage();
    return book.rating;
}

function _createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = ['Regex Redemption', 'Muki in wonderland', '16 shades of Hexadecimal'].map(_createBook);
    }
    gBooks = books;
    _saveToStorage();
}

function _createBook(name, price) {
    if (getIdx() === null) gIdx = 0;
    if (!price || price < 3) price = getRandomIntInclusive(1000, 10000) / 100;
    gIdx++;
    _saveIdxToStorage()
    return {
        id: gIdx,
        name: name,
        price: price,
        imgUrl: _getImage(),
        description: makeLorem(),
        rating: 0
    }
}

function _saveToStorage() {
    saveToStorage(KEY, gBooks)
}
function _saveIdxToStorage() {
    saveToStorage(IDX_KEY, gIdx)
}

function _getImage() {
    var imagesLinks = [
        'https://i.pinimg.com/originals/50/df/34/50df34b9e93f30269853b96b09c37e3b.jpg',
        'https://images.unsplash.com/photo-1420593248178-d88870618ca0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        'https://images.unsplash.com/photo-1568764587249-786404635731?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlJTIwcm9hZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
        'https://i.pinimg.com/originals/7b/b1/31/7bb13100d59e55d9cfc0aebde857adcc.jpg',
        'https://images.theconversation.com/files/329650/original/file-20200422-39156-yuzyyv.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip',
        'https://i.pinimg.com/originals/53/31/fc/5331fcab06dc662b9ea797b99d2b4b8f.jpg',
        'https://images.unsplash.com/photo-1529419412599-7bb870e11810?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHw%3D&w=1000&q=80',
        'https://img.redbull.com/images/c_fill,g_auto,w_860,h_1075/q_auto,f_auto/redbullcom/2015/07/27/1331737542701_2/moon-hill-natural-bridge-in-china',
        'https://images.unsplash.com/photo-1534411006708-6ec04172b80d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&w=1000&q=80',
        'https://i.insider.com/5d8e4a626f24eb197e6521d8?width=1100&format=jpeg&auto=webp',
        'https://images.unsplash.com/photo-1568160103848-d58542d2322b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwcGF0dGVybnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80',
        'https://fsa.zobj.net/crop.php?r=USKnqAGjjNn36KH3BSIvdr8nxOMjsuaqBBaiyr-acLxjj7XgPfIlA4aK4vIkdrMeK7YsumO_4RIIqvyS4xcMj4aCbqx-CCXixR76YPT9WtGBHx7v_bH7WX5brm5eWd3Gfb9b4p7Kazj4QcQT'
    ]
    var randomIdx = getRandomIntInclusive(0, 11);
    return imagesLinks[randomIdx];
}