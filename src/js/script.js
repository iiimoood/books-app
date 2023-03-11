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
      const thisBook = this;
      const generatedHTML = templateBook(thisBook);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      bookList.appendChild(generatedDOM);
    }
  }
  render();
}
