const bookForm = document.getElementById('bookForm');
const booksContainer = document.querySelector('.books');
const titleInput = bookForm.title;
const authorInput = bookForm.author;
const books = JSON.parse(localStorage.getItem('books')) || [];

class AwesomeBooks {
  constructor() {

  }

  addBook(title, author){
    books.push({
      title,
      author,
    });

    localStorage.setItem('books', JSON.stringify(books));
    return { title, author };
  };

  createBookElement({ title, author }){
    // Create elements

    const bookDiv = document.createElement('div');
    const bookTitle = document.createElement('h2');
    const bookAuthor = document.createElement('h3');
    const bookRemove = document.createElement('button');
    const bookHr = document.createElement('hr');

    // Fill the content
    bookTitle.innerText = `Book title: ${title}`;
    bookAuthor.innerText = `Book author: ${author}`;
    bookRemove.innerText = 'Remove';

    bookRemove.onclick = function () {
      bookRemove.parentElement.remove();
      let myIndex;
      for (let i = 0; i < books.length; i += 1) {
        if (books[i].title === title && books[i].author === author) {
          myIndex = i;
        }
      }
      books.splice(myIndex, 1);
      localStorage.setItem('books', JSON.stringify(books));
    };

    // Add to the DOM
    bookDiv.append(bookTitle, bookAuthor, bookRemove, bookHr);
    booksContainer.appendChild(bookDiv);
  };

}


const myBooks = new AwesomeBooks();


books.forEach(myBooks.createBookElement);

bookForm.onsubmit = (e) => {
  e.preventDefault();

  const newBook = myBooks.addBook(titleInput.value, authorInput.value);

  myBooks.createBookElement(newBook);

  titleInput.value = '';
  authorInput.value = '';
};
