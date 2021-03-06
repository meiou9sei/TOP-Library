/*

function Book(title, author, pages, readStatus) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
    }
}

*/

let myLibrary = [];

class Book{
    constructor(title, author, pages, readStatus) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readStatus = readStatus;
    }
    info(){
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
    }
}

/*************/
/* FUNCTIONS */
/*************/

//adds book to myLibrary array
function addBookToLibrary(book) {
    //add book to myLibrary
    myLibrary.push(book);
}

function createBookCard(book) {
    const cardDisplay = document.querySelector('.card-display-container');

    const card = document.createElement('div');
    card.classList.add('bookCard');

    card.innerHTML = `
        <p class="cardTitle">Title: ${book.title}</p>
        <p class="cardAuthor">Author: ${book.author}</p>
        <p class="cardPages">Pages: ${book.pages}</p>
        <button class="cardReadStatus">${book.readStatus}</button>
        <button class="removeCard">Remove Book</button>
    `;

    //makes card removable
    card.lastElementChild.addEventListener('click', (e) => {removeBook(e.target)});
    card.lastElementChild.previousElementChild.addEventListener('click', (e) => {readStatusToggle(e.target)});

    cardDisplay.appendChild(card);
}

function removeBook(el) {
    el.parentElement.remove();
}

function readStatusToggle(el) {
    //uhh add code here later
}

function clearNewBookForm() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('input[name="readStatus"]:checked').checked = false;
}

/***********/
/* BUTTONS */
/***********/
//makes new book input form appear upon clicking "NEW BOOK"
document.querySelector('#newBookBtn').addEventListener('click', function() {
    const container = document.querySelector('#newBookForm');
    container.classList.remove('invisible');
})

//makes new book form submittable
document.querySelector('#newBookForm').addEventListener('submit', function(e) {
    e.preventDefault(); //prevent page refresh

    //creates book object
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;    
    //for readStatus radio
    let readStatus = null;
    let readStatusSet = document.getElementsByName('readStatus');
    for (let i = 0, length = readStatusSet.length; i < length; i++) {
        if (readStatusSet[i].checked) {
            readStatus = readStatusSet[i].value;
            break;
        }
    }

    //validate book
    //warning if empty field
    if(title === "" || author === "" || pages === "" || readStatus === null) {
        const form = document.querySelector("#newBookForm");
        const warning = document.createElement('div');
        warning.classList.add('warning');
        warning.appendChild(document.createTextNode('Please fill in all fields'));
        form.insertBefore(warning, form.children[10]);

        setTimeout(() => document.querySelector('.warning').remove(), 3000);
    } else { //adds book if all fields good
        const newBook = new Book(title, author, pages, readStatus);
    
        addBookToLibrary(newBook); //add book to library
    
        createBookCard(newBook); //creates Book display card, adds to screen
    
        clearNewBookForm();        
    }


});

//removes new book form from page if clicked outside of
document.addEventListener('mouseup', function(e) {
    const container = document.querySelector('#newBookForm');
    if (!container.contains(e.target)) {
        container.classList.add('invisible');
    }
});

//deletes book from card Display
const removeBooks = document.querySelectorAll('.removeBook');
for (let i = 0; i < removeBooks.length; i++) {
    removeBooks[i].addEventListener('click', function(e) {
        removeBook(e.target);
    });
}
