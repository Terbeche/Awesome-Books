const bookForm = document.getElementById('bookForm');
const booksContainer = document.querySelector('.books');
const titleInput = bookForm.title;
const authorInput = bookForm.author;
const books = JSON.parse(localStorage.getItem('books')) || [];

class AwesomeBooks {
  addBook = (title, author) => {
    books.push({
      title,
      author,
    });

    localStorage.setItem('books', JSON.stringify(books));
    return {
      title,
      author,
    };
  }

  createBookElement = ({
    title,
    author,
  }) => {
    // Create elements

    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book-div');
    const bookOutput = document.createElement('p');
    const bookRemove = document.createElement('button');
    bookRemove.classList.add('book-remove');

    // Fill the content
    bookRemove.innerText = 'Remove';
    bookOutput.innerHTML = `"${title}" by ${author}`;

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
    bookDiv.append(bookOutput, bookRemove);
    booksContainer.appendChild(bookDiv);
  }
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

// set time
const displayDate = () => {
  const date = new Date();
  const options = {
    weekday: undefined,
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const [month, time] = [
    date.toLocaleDateString(undefined, options),
    date.toLocaleTimeString().toLocaleLowerCase(),
  ];
  document.getElementById('time').innerHTML = `${month}, ${time}`;
};
displayDate();
setInterval(displayDate, 1000);

const link = document.querySelectorAll('.nav-link');
const booksListSection = document.querySelector('#books-list');
const addBookSection = document.querySelector('#input-fields');
const contactSection = document.querySelector('.contact');
const sections = [booksListSection, addBookSection, contactSection];

link[0].addEventListener('click', () => {
  link[0].classList.add('active');
  link[0].classList.remove('desactive');
  link[1].classList.add('desactive');
  link[2].classList.add('desactive');
  sections[0].classList.remove('d-none');
  sections[1].classList.add('d-none');
  sections[2].classList.add('d-none');
});

link[1].addEventListener('click', () => {
  link[1].classList.add('active');
  link[1].classList.remove('desactive');
  link[0].classList.add('desactive');
  link[2].classList.add('desactive');
  sections[1].classList.remove('d-none');
  sections[0].classList.add('d-none');
  sections[2].classList.add('d-none');
});

link[2].addEventListener('click', () => {
  link[2].classList.add('active');
  link[2].classList.remove('desactive');
  link[0].classList.add('desactive');
  link[1].classList.add('desactive');
  sections[2].classList.remove('d-none');
  sections[0].classList.add('d-none');
  sections[1].classList.add('d-none');
});
