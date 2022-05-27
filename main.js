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
        <p class="cardReadStatus">Read?: ${book.readStatus}</p>
        <button class="removeCard">Remove Book</button>
    `;

    //makes card removable
    console.log(card.lastElementChild);
    card.lastElementChild.addEventListener('click', (e) => {removeBook(e.target)});

    cardDisplay.appendChild(card);
}

function removeBook(el) {
    console.log(el);
    el.parentElement.remove();
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
document.querySelector('#newBookBtn').addEventListener('click', function(e) {
    const container = document.querySelector('#newBookForm');
    container.classList.remove('invisible');

    makeNewBookFormSubmittable();
})

//removes new book form from page if clicked outside of
document.addEventListener('mouseup', function(e) {
    const container = document.querySelector('#newBookForm');
    if (!container.contains(e.target)) {
        container.classList.add('invisible');
    }
});

//deletes book from card Display
const removeBooks = document.querySelectorAll('.removeBook');
console.log(removeBooks);
for (let i = 0; i < removeBooks.length; i++) {
    removeBooks[i].addEventListener('click', function(e) {
        removeBook(e.target);
    });
}


//makes submit button do stuff
function makeNewBookFormSubmittable() {
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
    
        const newBook = new Book(title, author, pages, readStatus);
    
        addBookToLibrary(newBook); //add book to library
    
        createBookCard(newBook); //creates Book display card, adds to screen

        clearNewBookForm();

    });
}
