/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  const select = {
    templateBook: '#template-book',
  };
  const bookList = '.books-list';
  const templateBook = Handlebars.compile(
    document.querySelector(select.templateBook).innerHTML
  );

  function render() {
    for (const book of dataSource.books) {
      const generatedHTML = templateBook(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(bookList);
      bookContainer.appendChild(generatedDOM);
    }
  }

  const favoriteBooks = [];

  function initActions() {
    const bookList = document.querySelector('.books-list');

    bookList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const clickedElem = event.target;
      if (clickedElem.offsetParent.classList.contains('.book__image')) {
        const id = clickedElem.offsetParent.getAttribute('data-id');
        if (
          !clickedElem.offsetParent.classList.contains('favorite') &&
          !favoriteBooks.id
        ) {
          clickedElem.offsetParent.classList.add('favorite');
          favoriteBooks.push(id);
        } else {
          clickedElem.offsetParent.classList.remove('favorite');
          const index = favoriteBooks.indexOf(id);
          favoriteBooks.splice(index, 1);
        }
      }
    });
  }

  render();
  initActions();
}
