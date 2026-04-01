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
});

addBook.addEventListener("click", () => {
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
  let readOrNot;

  // ვქმნი სათაურის ელემენტს და ვამატებ ვიზუალურად

  let titlePara = document.createElement("p");
  titlePara.textContent = `დასახელება: ${myLibrary[i].title}`;
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
  addReadOrNot(i, books, readOrNot);

  // ვქმნი ჩარჩოს და ელემენტს სადაც ეს ინფორმაცია ჩაიწერება და ვუმატებ კლასს
  bookContainer.appendChild(books);
  books.classList.add("books");

  // ვამატებ წაკითხვის და წაშლის ღილაკებს
  addButtonsToBooks(books, readOrNot);
}

function addButtonsToBooks(books, readOrNot) {
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

  // წაკითხვის ღილაკს აძლევს ფუნქციონალს - ცვლის წაკითხვა/არ წაკითხვას
  readButton.addEventListener("click", (e) => {    
    readOrNot ? readOrNot = false : readOrNot = true;
    
    // addReadOrNot();
  })
};

// ეს ფუნქცია ამოწმებს მონიშნული იყო თუ არა checkbox წიგნის წაკითხვის შესახებ, ქმნის ელემენტს და გამოაქვს ვიზუალურად
function addReadOrNot(i, books, readOrNot) {
  let readPara = document.createElement("p");
  if (myLibrary[i].read) {
    readPara.textContent = "წაკითხული მაქვს ✅";
    readOrNot = true;    
  } else {
    readPara.textContent = "ჯერ არ წამიკითხავს ❌";
    readOrNot = false;
  }
  books.appendChild(readPara);
}