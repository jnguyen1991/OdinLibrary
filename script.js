
let myLibrary = [];
let counter = 0;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.bookNum = counter++;
    this.info = function() {
        let readStatus;
        if (!this.read) {
            readStatus = "not read yet";
        }
        else {
            readStatus = "already read";
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
    }
}

const lotr = new Book("Lord of the rings", "Tolkien", 100, true);

function addBookToLibrary(book){
    myLibrary.push(book);
    const table = document.querySelector('#library');
    let row = table.insertRow(-1);
    row.id = `book${book.bookNum}`;
    let c1 = row.insertCell(0);
    let c2 = row.insertCell(1);
    let c3 = row.insertCell(2);
    let c4 = row.insertCell(3);
    let c5 = row.insertCell(4);
    let c6 = row.insertCell(5);

    c1.innerText = book.title;
    c2.innerText = book.author;
    c3.innerText = book.pages;
    c4.innerText = book.read;
    c4.id = `readStatus${book.bookNum}`;
    var readToggle = document.createElement('input');
    readToggle.type = "button";
    readToggle.className = "btn";
    readToggle.id = book.bookNum;
    readToggle.value = "ReadToggle";
    readToggle.addEventListener('click', toggleRead);
    c5.appendChild(readToggle);

    var btn = document.createElement('input');
    btn.type = "button";
    btn.className = "btn";
    btn.id = book.bookNum;
    btn.value = "remove";
    btn.addEventListener('click', removeRow);
    c6.appendChild(btn);
}

function removeRow(e){
    console.log(e.target.id);
    const row = document.getElementById(`book${e.target.id}`);
    row.remove();
}

function toggleRead(e){
    console.log(e.target.id);
    const row = document.getElementById(`book${e.target.id}`);
    const readCell = row.cells[3];
    if (readCell.innerText === 'false'){
        readCell.innerText = 'true';
    }
    else{
        readCell.innerText = 'false';
    }
    
    
}

function addBookToLibraryEvent(e){
    e.preventDefault();
    let book = getBookFromInput();
    if (validateBook(book)){
        addBookToLibrary(book);
        hideAddBookForm(e);
        resetForm(e);
    }
    
}

function validateBook(book){
    if (book.title && book.author && book.pages){
        return true;
    }
    return false;
}

function startLibrary(){
    myLibrary.forEach(book => addBookToLibrary(book));
}

const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').checked
    return new Book(title, author, pages, isRead)
  }

function displayAddBookForm(e){
    const newBookForm = document.getElementById('newBookForm');
    newBookForm.style.visibility = "visible";
}

function hideAddBookForm(e){
    const newBookForm = document.getElementById('newBookForm');
    newBookForm.style.visibility = "hidden";
}

function resetForm(e){
    const form = document.getElementById('newBookForm');
    form.reset();
}

const addBookButton = document.getElementById("addBookButton");
addBookButton.addEventListener('click',addBookToLibraryEvent);
addBookToLibrary(lotr);

const newBookButton = document.getElementById("newBookButton");
newBookButton.addEventListener('click',displayAddBookForm);