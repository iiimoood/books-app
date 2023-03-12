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
    const bookImages = bookList.querySelectorAll('.book__image');

    bookList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      for (let bookImage of bookImages) {
        if (event.target.offsetParent.classList.contains('.book__image')) {
          if (!bookImage.classList.contains('favorite')) {
            bookImage.classList.add('favorite');
            const id = bookImage.getAttribute('data-id');
            favoriteBooks.push(id);
          } else {
            bookImage.classList.remove('favorite');
          }
        }
      }
    });
  }

  render();
  initActions();
}
