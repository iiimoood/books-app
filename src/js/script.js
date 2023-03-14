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
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = (book.rating / 10) * 100;
    }
  }

  const favoriteBooks = [];
  const filters = [];

  function initActions() {
    const bookList = document.querySelector('.books-list');
    const form = document.querySelector('.filters');

    bookList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const clickedElem = event.target;
      if (clickedElem.offsetParent.classList.contains('book__image')) {
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

    form.addEventListener('click', function (event) {
      const clickedElement = event.target;
      if (
        clickedElement.tagName == 'INPUT' &&
        clickedElement.type == 'checkbox' &&
        clickedElement.name == 'filter'
      ) {
        console.log(clickedElement.value);
        if (clickedElement.checked) {
          filters.push(clickedElement.value);
        } else {
          const index = filters.indexOf(clickedElement.value);
          filters.splice(index, 1);
        }
        filterBooks();
      }
    });
  }

  function filterBooks() {
    for (const book of dataSource.books) {
      let shouldBeHidden = false;
      for (const filter of filters) {
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      const bookImage = document.querySelector(
        '.book__image[data-id="' + book.id + '"]'
      );

      if (shouldBeHidden) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }
  function determineRatingBgc(rating) {
    //for (const book of dataSource.books) {
    if (rating < 6) {
      background: 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    }
    if (rating > 6 && rating <= 8) {
      background: 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    }
    if (rating > 8 && rating <= 9) {
      background: 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else {
      background: 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    // }
  }
  render();
  initActions();
}
