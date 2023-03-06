const myLibrary = [];

/* function Book(index, title, author, pages, is_read = false) {
  this.index = index;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.is_read = is_read;
  this.info = function () {
    let read = this.is_read ? 'have read it' : 'not read yet';
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
} */

class Book {
  constructor(index, title, author, pages, is_read) {
    this.index = index;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.is_read = is_read;
  }
}

function CreateBookChildElement(element, classes, info, index) {
  const newElement = document.createElement(element);
  classes.forEach((elementClass) => {
    newElement.classList.add(elementClass);
  });

  if (info !== undefined) {
    newElement.innerText = info;
  }

  if (index !== undefined) {
    newElement.dataset.index = index;
  }

  return newElement;
}

function AppendChild(element, children) {
  children.forEach((child) => {
    element.appendChild(child);
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
  book.index = myLibrary.length;
  myLibrary.push(book);
  RefreshBookself();
}

function WatchAddBookForm(modal) {
  const button = document.querySelector('.add-dialog__form__button');
  const form = document.querySelector('#add-dialog__form');

  button.addEventListener('click', (event) => {
    event.preventDefault();

    const formFields = {
      title: document.querySelector('#add-dialog__form__data__title'),
      author: document.querySelector('#add-dialog__form__data__author'),
      pages: document.querySelector('#add-dialog__form__data__pages'),
      read: document.querySelector('#add-dialog__form__data__read'),
    };

    if (form.checkValidity()) {
      const book = new Book(
        '',
        formFields.title.value,
        formFields.author.value,
        formFields.pages.value,
        formFields.read.checked
      );
      AddBookToLibrary(book);
      Object.keys(formFields).forEach((key) => {
        formFields[key].value = '';
      });
      modal.close();
    } else {
      form.reportValidity();
    }
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

function CreatePlaceHolderContent() {
  const someBooks = {
    0: ['', 'Nineteen Eighty-Four', 'George Orwell', '328', true],
    1: ['', 'The Little Prince', 'Antoine de Saint-Exupéry', '96', false],
    2: ['', 'The Lord of the Rings: The Fellowship of the Ring', 'J. R. R. Tolkien', '479', true],
    3: ['', 'The Lord of the Rings: The Two Towers', 'J. R. R. Tolkien', '415', false],
    4: ['', 'The Lord of the Rings: The Return of the King', 'J. R. R. Tolkien', '347', false],
  };

  for (const aBook in someBooks) {
    const newBook = new Book(...someBooks[aBook]);
    AddBookToLibrary(newBook);
  }
}
CreatePlaceHolderContent();
