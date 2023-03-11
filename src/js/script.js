/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  ('use strict');

  const select = {
    templateBook: '#template-book',
  };
  const bookList = '.books-list';
  const bookImage = '.book__image';
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

  const favouriteBooks = [];

  function initActions() {
    const bookImagesList = '.booksList .book__image';
    for (const elem of bookImagesList) {
      elem.addEventListener('dblclick', function (event) {
        event.preventDefault();
        image.classList.add('favourite');
        const id = image['data - id'];
        favouriteBooks.push(id);
      });
    }
    console.log(bookImagesList);
  }
  render();
  initActions();
}
