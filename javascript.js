const adding = document.querySelector(".adding");
const dialogWindow = document.querySelector(".window"); 
const addBook = document.querySelector(".addBook");
const closing = document.querySelector(".close");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const myLibrary = [];
const bookContainer = document.querySelector(".book-container");

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

  if (savedTitle !== ""){
    addBookToLibrary(savedTitle, savedAuthor, savedPages, savedRead);
    clearFields();
    hideWindow();
    removeDivs();
    showOnDisplay();
  } else {
    title.addEventListener("invalid", () => {
      title.setCustomValidity("შევსება სავალდებულოა");
    });
    title.addEventListener("input", () => {
      title.setCustomValidity("");
    });
  }   
});

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
    createBooks(i);
  };
}

function clearFields() {
  title.value = "";
  author.value = ""; 
  pages.value = "";
  read.checked = false;
}

function hideWindow() {
  dialogWindow.style.visibility = "hidden";
}

function createBooks(i) {
  let titlePara;
  let authorPara;
  let pagesPara;
  let readPara; 
 
  let books = document.createElement("div");

  if (myLibrary[i].title != "") {
    titlePara = document.createElement("p");
    titlePara.textContent = `დასახელება: ${myLibrary[i].title}`;
    books.appendChild(titlePara);
  }
  if (myLibrary[i].author != "") {
    authorPara = document.createElement("p");
    authorPara.textContent = `ავტორი: ${myLibrary[i].author}`;
    books.appendChild(authorPara);
  }
  if (myLibrary[i].pages != "") {
    pagesPara = document.createElement("p");
    pagesPara.textContent = `გვერდების რაოდენობა: ${myLibrary[i].pages}`;
    books.appendChild(pagesPara);
  }

  
  readPara = document.createElement("p");
  if (myLibrary[i].read) {      
  readPara.textContent = "წაკითხული მაქვს ✅";
  } else {
  readPara.textContent = "ჯერ არ წამიკითხავს ❌";
  }     

  bookContainer.appendChild(books);
  books.appendChild(readPara);
  books.classList.add("books");

  addButtonsToBooks(books);
}

function removeDivs() {
  const books = bookContainer.querySelectorAll(".books");
  books.forEach(book => book.remove());  
}

function addButtonsToBooks(books) {
   

  // ელემენტს ვქმნი
  let buttonContainer = document.createElement("div");  
  let readButton = document.createElement("button");
  let removeButton = document.createElement("button");  
  
  // ვარქმევ ღილაკებს სახელებს   
  readButton.textContent = "წავიკითხე";
  removeButton.textContent = "წაშლა";

  // გამომაქვს ღილაკები ვიზუალურად
  books.appendChild(buttonContainer);
  buttonContainer.appendChild(readButton);
  buttonContainer.appendChild(removeButton);

  // ვუმატებ ღილაკებს კლასს
  readButton.classList.add("read-button");
  removeButton.classList.add("remove-button");  
  buttonContainer.classList.add("button-container");
}