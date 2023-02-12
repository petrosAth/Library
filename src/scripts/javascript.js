const modal = document.querySelector('.add-dialog');
const openModal = document.querySelector('.add-button');

openModal.addEventListener('click', () => {
  modal.showModal();
});

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
