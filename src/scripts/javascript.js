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

function CreateBookChildElement(element, classes, info, index) {
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
  deleteButton.addEventListener('click', () => {
    myLibrary[bookIndex] = null;
    RefreshBookself();
  });
}

function CreateButtonToggleBookStatus(statusButton, book) {
  statusButton.addEventListener('click', () => {
    book.is_read = !book.is_read;
    RefreshBookself();
  });
}

function RefreshBookself() {
  let bookself = document.querySelector('.bookself');
  bookself.innerHTML = '';
  myLibrary.forEach((book) => {
    if (book !== null) {
      CreateBookElement(bookself, book);
    }
  });
}

function CreateBookElement(bookself, book) {
  const bookLabel = CreateBookChildElement('div', [
    'book__label',
    book.is_read ? 'book__label--is-read' : 'book__label--not-read',
  ]);
  const bookButtonStatus = CreateBookChildElement('div', [
    'button',
    'book__button',
    'book__button-status',
    book.is_read ? 'book__button-status--is-read' : 'book__button-status--not-read',
  ]);
  CreateButtonToggleBookStatus(bookButtonStatus, book);
  const bookAuthor = CreateBookChildElement('div', ['book__main__info__author'], book.author);
  const bookTitle = CreateBookChildElement('div', ['book__main__info__title'], book.title);
  const bookPages = CreateBookChildElement('div', ['book__main__info__pages'], book.pages + ' pages');

  const bookInfo = CreateBookChildElement('div', ['book__main__info']);
  AppendChild(bookInfo, [bookAuthor, bookTitle, bookPages]);

  const bookMain = CreateBookChildElement('div', ['book__main']);
  AppendChild(bookMain, [bookInfo]);

  const bookButtonDelete = CreateBookChildElement('div', ['button', 'book__button', 'book__button-delete']);
  CreateButtonDeleteBook(bookButtonDelete, book.index);

  const bookElement = CreateBookChildElement('div', ['book'], '', book.index);
  AppendChild(bookElement, [bookLabel, bookButtonStatus, bookMain, bookButtonDelete]);

  bookself.appendChild(bookElement);
}

function AddBookToLibrary(book) {
  book.index = +myLibrary.length;
  myLibrary.push(book);
  RefreshBookself();
}

function WatchAddBookForm(modal) {
  const button = document.querySelector('.add-dialog__form__button');

  button.addEventListener('click', (event) => {
    event.preventDefault();

    const form = {
      title: document.querySelector('#add-dialog__form__data__title'),
      author: document.querySelector('#add-dialog__form__data__author'),
      pages: document.querySelector('#add-dialog__form__data__pages'),
      read: document.querySelector('#add-dialog__form__data__read'),
    };
    const book = new Book('', form.title.value, form.author.value, form.pages.value, form.read.checked);
    AddBookToLibrary(book);
    Object.keys(form).forEach((key) => {
      form[key].value = '';
    });
    modal.close();
  });
}

function ControlFormModal() {
  const modal = document.querySelector('.add-dialog');
  const openModal = document.querySelector('.add-button');
  const closeModal = document.querySelector('.add-dialog__form__title__close-button');

  openModal.addEventListener('click', () => {
    modal.showModal();
  });
  closeModal.addEventListener('click', () => {
    modal.close();
  });

  WatchAddBookForm(modal);
}

ControlFormModal();
