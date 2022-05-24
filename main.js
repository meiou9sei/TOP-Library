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
    const cardDisplay = document.querySelector('.card-display');

    const card = document.createElement('div');

    card.innerHTML = `
        <p>${book.title}</p>
        <p>${book.author}</p>
        <p>${book.pages}</p>
        <p>replace me test read status</p>
    `;

    cardDisplay.appendChild(card);
}

/***********/
/* BUTTONS */
/***********/
//makes submit button do stuff
document.querySelector('#newBookForm').addEventListener('submit', function(e) {
    e.preventDefault(); //prevent page refresh

    //creates book object
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;

    let readStatus = null; //deals with radio
    let readStatusAnswers = document.getElementsByName('readStatus'); 
    for (let i = 0; i < readStatusAnswers.length; i++) {
        if (readStatusAnswers[i].checked)
            readStatus = readStatusAnswers[i];
    }

    let newBook = new Book(title, author, pages, readStatus);


    addBookToLibrary(newBook); //add book to library

    createBookCard(newBook); //creates Book display card, adds to screen


    //addBookToLibrary(e);
});

