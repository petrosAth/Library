const modal = document.querySelector('.add-dialog');
const openModal = document.querySelector('.add-button');

openModal.addEventListener('click', () => {
  modal.showModal();
});

function CreateBookHTML(index, title, author, pages, is_read) {
  const bookLabel = document.createElement('div');
  bookLabel.classList.add('book__label', 'book__label--not-read');

  const bookButtonStatus = document.createElement('button');
  bookButtonStatus.classList.add('button', 'book__button', 'book__button-status', 'book__button-status--not-read');

  const bookAuthor = Object.assign(document.createElement('div'), {
    className: 'book__main__info__author',
    innerText: 'Tolkien',
  });
  const bookTitle = Object.assign(document.createElement('div'), {
    className: 'book__main__info__title',
    innerText: 'Lord of the rings',
  });
  const bookPages = Object.assign(document.createElement('div'), {
    className: 'book__main__info__pages',
    innerText: '999',
  });

  const bookInfo = document.createElement('div');
  bookInfo.classList.add('book__main__info');
  bookInfo.appendChild(bookAuthor);
  bookInfo.appendChild(bookTitle);
  bookInfo.appendChild(bookPages);

  const bookMain = document.createElement('div');
  bookMain.classList.add('book__main');
  bookMain.appendChild(bookInfo);

  const bookButtonDelete = document.createElement('button');
  bookButtonDelete.classList.add('button', 'book__button', 'book__button-delete');

  const book = document.createElement('div');
  book.appendChild(bookLabel);
  book.appendChild(bookButtonStatus);
  book.appendChild(bookMain);
  book.appendChild(bookButtonDelete);
  book.classList.add('book');
  book.dataset.index = 82;

  let bookself = document.querySelector('.bookself');
  bookself.appendChild(book);
}
