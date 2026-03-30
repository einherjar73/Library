const adding = document.querySelector(".adding");
const dialogWindow = document.querySelector(".window"); 
const addBook = document.querySelector(".addBook");
const closing = document.querySelector(".close");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");

adding.addEventListener("click", () => {
  dialogWindow.style.visibility = "visible";
});

closing.addEventListener("click", () => {  
  clearFields();
  hideWindow();
})

addBook.addEventListener("click", () => {
  let savedTitle = title.value;
  let savedAuthor = author.value;
  let savedPages = pages.value;
  let savedRead = read.checked;

  addBookToLibrary(savedTitle, savedAuthor, savedPages, savedRead);
  clearFields();
  hideWindow();
});

const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function showOnDisplay() {
  for(let i = 0; i < myLibrary.length; i++){
    
  };
}

function clearFields() {
  title.value = "";
  author.value = "";
  pages.value = "";
  read.value = "false";
}

function hideWindow() {
  dialogWindow.style.visibility = "hidden";
}