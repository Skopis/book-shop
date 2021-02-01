'use strict';

var gBook = null;

function onInit() {
    _createBooks();
    renderBooks();
}


function renderBooks() {
    var books = getBooks();
    console.log('books', books);
    var strHTMLs = books.map(function (book) {
        return `<tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>$${book.price}</td>
        <td><a href="${book.imgUrl}" target="_blank">Image</a></td>
        <td><button class="read" onclick="onReadBook('${book.id}')">Read</button></td>
        <td><button class="update" onclick="onUpdateButton('${book.id}')">Update</button></td>
        <td><button class="delete" onclick="onDeleteBook('${book.id}')">Delete</button></td>
        </tr>`
    });
    var elTable = document.querySelector('.table-body');
    elTable.innerHTML = strHTMLs.join('');
}

function onSetFilter(elButton) {
    if(elButton.innerText==='Price') sortByPrice();
    else if (elButton.innerText==='Book Name') sortByName();
    else sortById();
    renderBooks();
}

function onDeleteBook(BookId) {
    deleteBook(BookId)
    renderBooks()
}

function onAddBook() {
    var name = prompt('Please enter the name of the book');
    var price = prompt('Please enter the price of the book');
    addBook(name, price);
    renderBooks();
}

function onUpdateButton(bookId){
    gBook = getBookById(bookId);
    document.querySelector('.update-price').style.display= 'block';
}
function onUpdateBook(ev) {
    ev.preventDefault();
    var elPriceTxt = document.querySelector('input[name=priceTxt]');
    var newPrice = elPriceTxt.value;
    if (!newPrice) return;
    updateBook(gBook.id, newPrice);
    elPriceTxt.value = '';
    renderBooks();
    document.querySelector('.update-price').style.display= 'none';
}

function onUpdateRating(elButton) {
    var book = findBookByName(document.querySelector('h5').innerText);
    if (elButton.innerText === '−') updateRating('−', book);
    else updateRating('+', book);
    document.querySelector('.rating').innerText = book.rating;
}

function onReadBook(BookId) {
    var book = getBookById(BookId);
    var elModal = document.querySelector('.modal');
    elModal.querySelector('h5').innerText = book.name;
    elModal.querySelector('.pic').innerHTML = `<img src="${book.imgUrl}" style="max-width: 200px; max-height: 250px; border-radius: 2%;" alt="Italian Trulli">`;
    elModal.querySelector('p').innerText = book.price;
    elModal.querySelector('.rating').innerText = book.rating;
    elModal.hidden = false;
}

function onCloseModal() {
    document.querySelector('.modal').hidden = true
}