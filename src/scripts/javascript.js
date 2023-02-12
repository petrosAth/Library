function createBookElement(element, classes, info, index) {
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

function appendChild(element, children) {
  children.forEach((child) => {
    element.appendChild(child);
  });
}

function CreateBookHTML(index, title, author, pages, is_read) {
  const bookLabel = createBookElement('div', [
    'book__label',
    is_read ? 'book__label--is-read' : 'book__label--not-read',
  ]);
  const bookButtonStatus = createBookElement('div', [
    'button',
    'book__button',
    'book__button-status',
    is_read ? 'book__button-status--is-read' : 'book__button-status--not-read',
  ]);
  const bookAuthor = createBookElement('div', ['book__main__info__author'], author);
  const bookTitle = createBookElement('div', ['book__main__info__title'], title);
  const bookPages = createBookElement('div', ['book__main__info__pages'], pages);

  const bookInfo = createBookElement('div', ['book__main__info']);
  appendChild(bookInfo, [bookAuthor, bookTitle, bookPages]);

  const bookMain = createBookElement('div', ['book__main']);
  appendChild(bookMain, [bookInfo]);

  const bookButtonDelete = createBookElement('div', ['button', 'book__button', 'book__button-delete']);

  const book = createBookElement('div', ['book'], '', index);
  appendChild(book, [bookLabel, bookButtonStatus, bookMain, bookButtonDelete]);

  let bookself = document.querySelector('.bookself');
  bookself.appendChild(book);
}

const myLibrary = [];

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
  book.index = myLibrary.length + 1;
  myLibrary.push(book);
  CreateBookHTML(book.index, book.title, book.author, book.pages, book.is_read);
}


const modal = document.querySelector('.add-dialog');
const openModal = document.querySelector('.add-button');

openModal.addEventListener('click', () => {
  modal.showModal();
});

function addBook() {
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

addBook();
