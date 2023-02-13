const myLibrary = [];

function CreateBookElement(element, classes, info, index) {
  const newElement = document.createElement(element);
  classes.forEach((elementClass) => {
    newElement.classList.add(elementClass);
  });

  if (info) {
    newElement.innerText = info;
  }

  if (index) {
    newElement.dataset.index = index;
  }

  return newElement;
}

function AppendChild(element, children) {
  children.forEach((child) => {
    element.appendChild(child);
  });
}

function CreateButtonDeleteBook(deleteButton, bookIndex) {
  console.log(myLibrary[bookIndex]);
  deleteButton.addEventListener('click', () => {
    myLibrary[bookIndex] = null;
    console.log(myLibrary[bookIndex]);
    RefreshBookself();
  });
}

function RefreshBookself() {
  let bookself = document.querySelector('.bookself');
  bookself.innerHTML = '';
  myLibrary.forEach((book) => {
    if (book !== null) {
      CreateBookHTML(bookself, book);
    }
  });
}

function CreateBookHTML(bookself, book) {
  const bookLabel = CreateBookElement('div', [
    'book__label',
    book.is_read ? 'book__label--is-read' : 'book__label--not-read',
  ]);
  const bookButtonStatus = CreateBookElement('div', [
    'button',
    'book__button',
    'book__button-status',
    book.is_read ? 'book__button-status--is-read' : 'book__button-status--not-read',
  ]);
  const bookAuthor = CreateBookElement('div', ['book__main__info__author'], book.author);
  const bookTitle = CreateBookElement('div', ['book__main__info__title'], book.title);
  const bookPages = CreateBookElement('div', ['book__main__info__pages'], book.pages + ' pages');

  const bookInfo = CreateBookElement('div', ['book__main__info']);
  AppendChild(bookInfo, [bookAuthor, bookTitle, bookPages]);

  const bookMain = CreateBookElement('div', ['book__main']);
  AppendChild(bookMain, [bookInfo]);

  const bookButtonDelete = CreateBookElement('div', ['button', 'book__button', 'book__button-delete']);
  CreateButtonDeleteBook(bookButtonDelete, book.index);

  const bookElement = CreateBookElement('div', ['book'], '', book.index);
  AppendChild(bookElement, [bookLabel, bookButtonStatus, bookMain, bookButtonDelete]);

  bookself.appendChild(bookElement);
}

function Book(index, title, author, pages, is_read = false) {
  this.index = index;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.is_read = is_read;
  this.info = function () {
    let read = this.is_read ? 'have read it' : 'not read yet';
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}

function AddBookToLibrary(book) {
  book.index = +myLibrary.length;
  myLibrary.push(book);
  RefreshBookself();
}


const modal = document.querySelector('.add-dialog');
const openModal = document.querySelector('.add-button');

openModal.addEventListener('click', () => {
  modal.showModal();
});

function AddBook() {
  const button = document.querySelector('.add-dialog__form__button');
  const formTitle = document.querySelector('#add-dialog__form__data__title');
  const formAuthor = document.querySelector('#add-dialog__form__data__author');
  const formPages = document.querySelector('#add-dialog__form__data__pages');
  const formRead = document.querySelector('#add-dialog__form__data__read');

  button.addEventListener('click', (event) => {
    event.preventDefault();
    const book = new Book('', formTitle.value, formAuthor.value, formPages.value, formRead.checked);
    AddBookToLibrary(book);
    modal.close();
  });
}

AddBook();
