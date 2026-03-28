const adding = document.querySelector(".adding");
const dialogWindow = document.querySelector(".window"); 
const addBook = document.querySelector(".addBook");
const closing = document.querySelector(".close");

adding.addEventListener("click", () => {
  dialogWindow.style.visibility = "visible";
});

closing.addEventListener("click", () => {
  dialogWindow.style.visibility = "hidden";
})

addBook.addEventListener("click", () => {
  
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
  let book1 = new Book(title, author, pages, read);
  myLibrary.push(book1);
}

function showOnDisplay() {
  for(let i = 0; i < myLibrary.length; i++){
    
  };
}