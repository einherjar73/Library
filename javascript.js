const adding = document.querySelector(".adding");
const dialogWindow = document.querySelector(".window");
const addButton = document.querySelector(".addBook");
const closing = document.querySelector(".close");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const myLibrary = [];
const bookContainer = document.querySelector(".book-container");


// dialogWindow.addEventListener("submit", (e) => {
//   e.preventDefault();
// });

// closing.addEventListener("click", (e) => {
//   e.preventDefault();
// });

adding.addEventListener("click", () => {
  dialogWindow.style.visibility = "visible";
});

closing.addEventListener("click", () => {
  clearFields();
  hideWindow();
});

addButton.addEventListener("click", () => {
  addBook();
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
  for (let i = 0; i < myLibrary.length; i++) {
    createBooks(i);
  }
}

// ეს ფუნქცია ასუფთავებს ველებს
function clearFields() {
  title.value = "";
  author.value = "";
  pages.value = "";
  read.checked = false;
}

function hideWindow() {
  dialogWindow.style.visibility = "hidden";
}

// ეს ფუნქცია შლის წიგნების ელემენტს ციკლში რომ არ მეორდებოდეს ყოველი წინა ელემენტები
function removeDivs() {
  const books = bookContainer.querySelectorAll(".books");
  books.forEach((book) => book.remove());
}

function createBooks(i) {
  let books = document.createElement("div");  

  // ვქმნი სათაურის ელემენტს და ვამატებ ვიზუალურად

  let titlePara = document.createElement("p");
  titlePara.textContent = `${myLibrary[i].title}`;
  titlePara.style.fontSize = "1.5rem";
  titlePara.style.textAlign = "center";
  books.appendChild(titlePara);

  // ავტორის ველს ვამოწმებ ცარიელი არის თუ არა და მერე ვქმნი ელემენტს და ვამატებ ვიზუალურად
  if (myLibrary[i].author != "") {
    let authorPara = document.createElement("p");
    authorPara.textContent = `ავტორი: ${myLibrary[i].author}`;
    books.appendChild(authorPara);
  }

  // გვერდების რაოდენობას ვამოწმებ ცარიელი არის თუ არა და მერე ვქმნი ელემენტს და ვამატებ ვიზუალურად
  if (myLibrary[i].pages != "") {
    let pagesPara = document.createElement("p");
    pagesPara.textContent = `გვერდების რაოდენობა: ${myLibrary[i].pages}`;
    books.appendChild(pagesPara);
  }

  // ვქმნი წაკითხულია თუ არა წიგნი და მონიშნული თუა checkbox ვამოწმებ, ვქმნი ელემენტს და ვამატებ ვიზუალურად
  let readPara = document.createElement("p");
  readPara.style.textAlign = "center";
  if (myLibrary[i].read) {
    readPara.textContent = "წაკითხული მაქვს ✅";
  } else {
    readPara.textContent = "ჯერ არ წამიკითხავს ❌";    
  }  
  books.appendChild(readPara); 

  // ვქმნი ჩარჩოს და ელემენტს სადაც ეს ინფორმაცია ჩაიწერება და ვუმატებ კლასს
  bookContainer.appendChild(books);
  books.classList.add("books");

  // ვამატებ წაკითხვის და წაშლის ღილაკებს
  addButtonsToBooks(books, i, readPara);
}

function addButtonsToBooks(books, i, readPara) {
  // ელემენტს ვქმნი
  let buttonContainer = document.createElement("div");
  let readButton = document.createElement("button");
  let removeButton = document.createElement("button");
  
  // ვარქმევ ღილაკებს სახელებს
  if (myLibrary[i].read === false) {
    readButton.textContent = "წავიკითხე";
  } else {
    readButton.textContent = "არ წამიკითხავს"
  }
  removeButton.textContent = "წაშლა";

  // გამომაქვს ღილაკები ვიზუალურად
  books.appendChild(buttonContainer);
  buttonContainer.appendChild(readButton);
  buttonContainer.appendChild(removeButton);
  
  readButton.addEventListener("click", () => {     
    changeReadToUnread(i, readPara, readButton);
  });

  removeButton.addEventListener("click", () => {
    removeBook(i);
  });

  // ვუმატებ ღილაკებს კლასს
  readButton.classList.add("read-button");
  removeButton.classList.add("remove-button");
  buttonContainer.classList.add("button-container");  
};


function changeReadToUnread(i, readPara, readButton) {  
  if (myLibrary[i].read) {
    readPara.textContent = "ჯერ არ წამიკითხავს ❌";
    myLibrary[i].read = false;
    readButton.textContent = "წავიკითხე"
  } else {
    readPara.textContent = "წაკითხული მაქვს ✅";
    myLibrary[i].read = true;
    readButton.textContent = "არ წამიკითხავს"
  }  
}

function addBook () {
  let savedTitle = title.value;
  let savedAuthor = author.value;
  let savedPages = pages.value;
  let savedRead = read.checked;

  if (savedTitle !== "") {
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
}

function removeBook(i) {
  myLibrary.splice(i, 1);
  const books = bookContainer.querySelectorAll(".books");    
}