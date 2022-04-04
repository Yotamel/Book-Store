'use strict'

function init() {
    console.log('initializing')
    renderBooks()
}

function renderBooks() {
    var books = getBooks()
    const strHtmlStart = '<tr><th>Id</th><th>Title</th><th>Price</th><th colspan="3">Actions</th></tr>'
    const strHtml = books.map(book => `<tr>
    <td>${book.id}</td>
    <td>${book.name}</td>
    <td>${book.price}$</td>
    <td><button onclick="onReadBook('${book.id}')" class = "read-btn">Read</button></td>
    <td><button onclick="onUpdateBook('${book.id}')" class = "update-btn">Update</button></td>
    <td><button onclick="onDeleteBook('${book.id}')" class = "delete-btn">Delete</button></td></tr>`)  //<img onerror="this.src='img/default.jpg'" src="img/${car.vendor}.png" alt="Car by ${car.vendor}">
    document.querySelector('.book-selection table').innerHTML = strHtmlStart + strHtml.join('')
}

function renderModal(id) {
    const book = getBookById(id)
    const strHtml = `<button onclick="closeModal()" class="close-modal">x</button>
     <div class="img-container"><img onerror="this.src='img/default.jpg'" src="img/${book.imgUrl}"></div>
     <h1 class="book-title">${book.name}</h1>
     <p class="book-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent magna ipsum,
         bibendum in venenatis in, ornare quis nunc. Morbi porttitor cursus turpis, ac ultrices tortor congue ac.
         Morbi sapien lacus, varius in dui eget, auctor ornare lorem. Fusce quis magna quam. Sed maximus semper erat,
         ut congue lacus aliquam id. Quisque sollicitudin pretium libero, ut pharetra ipsum suscipit placerat.
         Integer lacinia, lacus vitae condimentum iaculis, dolor tellus tristique lectus, vitae cursus purus dui et
         elit. Suspendisse eu ante ut turpis gravida fringilla. In facilisis nulla vel consequat tincidunt. Integer
         mollis lorem vel blandit pharetra. Etiam elementum sagittis sem, sed consectetur justo molestie tristique.
     </p>
     <div class="ratings-container">
         <h2>Rate Your Experience</h2>
         <h4>from 1-10</h4>
         <button onclick="onClickRating('${book.id}',this.innerHTML)" class="rating-button">-</button>
         <span>${book.rating}</span>
         <button onclick="onClickRating('${book.id}',this.innerHTML)" class="rating-button">+</button>
     </div>`
    document.querySelector('.modal').innerHTML = strHtml
}


function onReadBook(id) {
    const elModal = document.querySelector('.modal')
    if (elModal.classList.length !== 1) {
        closeModal()
        return setTimeout(function () { onReadBook(id) }, 700)

    }
    console.log('Read pending, book id', id)
    renderModal(id)
    elModal.classList.add('open')
}

function onUpdateBook(id) {
    console.log('Update pending, book id', id)
    var price = +prompt('Name new Price: ')
    updatePrice(id, price)
    renderBooks()
}

function onDeleteBook(id) {
    console.log('Delete...')
    deleteBook(id)
    renderBooks()
}

function onAddBook() {
    var name = prompt('Enter Book Name: ')
    var price = +prompt('Name Price: ')
    while (!name || !price || price < 0) {
        if (!name) name = prompt('Please Enter Valid Name: ')
        if (!price || price < 0) price = +prompt('Please Name Valid Price (above 0): ')
    }
    addBook(name, price)
    renderBooks()
}

function onClickRating(id, action) {
    console.log(id, action)
    updateRating(id,action)
    renderModal(id)
}

function closeModal() {
    var elModal = document.querySelector(".modal")
    elModal.classList.remove("open")
}

