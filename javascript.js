

const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let book1 = new Book(title, author, pages, read);
  myLibrary.push(book1);
}

function showOnDisplay() {
  for(let i = 0; i < myLibrary.length; i++){
    
  };
}