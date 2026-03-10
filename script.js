function addBook(titleParam, authorParam, genreParam, coverParam, pagesParam) {

  const title = titleParam || document.getElementById('titleIn').value;
  const author = authorParam || document.getElementById('authorIn').value;
  const genre = genreParam || document.getElementById('genreIn').value;
  const pages = pagesParam || document.getElementById('pagesIn').value || 0;
  const coverUrl = coverParam || document.getElementById('coverIn').value || 'default-cover.jpg';

  const container = document.getElementById('libraryContainer');

  const card = document.createElement('div');
  card.className = "book-card";

  card.dataset.title = title.toLowerCase();
  card.dataset.author = author.toLowerCase();
  card.dataset.genre = genre.toLowerCase();
  card.dataset.pages = pages;
  card.dataset.status = "want to read";

  card.style = "border: 1px solid #ccc; padding: 15px; width: 200px; border-radius: 8px; text-align: center;";

  card.innerHTML = `
    <img src="${coverUrl}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 4px;">
    <h3>${title}</h3>
    <p>Author: ${author}</p>
    <p>Genre: ${genre}</p>
    <p>Pages: ${pages}</p>

    <select onchange="updateStatus(this)">
      <option value="want to read">⏳ Want to Read</option>
      <option value="currently reading">📖 Currently Reading</option>
      <option value="read">✅ Read</option>
    </select>

    <select name="rating">
      <option value="0">Select Rating</option>
      <option value="1">⭐ (1/5)</option>
      <option value="2">⭐⭐ (2/5)</option>
      <option value="3">⭐⭐⭐ (3/5)</option>
      <option value="4">⭐⭐⭐⭐ (4/5)</option>
      <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
    </select>

    <br><br>
    <button onclick="this.parentElement.remove()">Remove</button>
  `;

  container.appendChild(card);
}

function updateStatus(selectElement) {

  const card = selectElement.parentElement;
  const status = selectElement.value;

  card.dataset.status = status;

  if (status === "read") {
    alert("🎉 You Finished this Book Congratulations!");
  }

}

function filterBooks() {

  const search = document.getElementById("searchBar").value.toLowerCase();
  const genreFilter = document.getElementById("genreFilter").value;
  const pageFilter = document.getElementById("pageFilter").value;
  const statusFilter = document.getElementById("statusFilter").value;

  const books = document.querySelectorAll(".book-card");

  books.forEach(book => {

    const title = book.dataset.title;
    const author = book.dataset.author;
    const genre = book.dataset.genre;
    const pages = parseInt(book.dataset.pages);
    const status = book.dataset.status;

    const matchesSearch =
      title.includes(search) ||
      author.includes(search);

    const matchesGenre =
      genreFilter === "all" || genre === genreFilter;

    let matchesPages = true;

    if (pageFilter === "short") {
      matchesPages = pages < 200;
    }
    else if (pageFilter === "medium") {
      matchesPages = pages >= 200 && pages <= 400;
    }
    else if (pageFilter === "long") {
      matchesPages = pages > 400;
    }

    const matchesStatus =
      statusFilter === "all" || status === statusFilter;

    if (matchesSearch && matchesGenre && matchesPages && matchesStatus) {
      book.style.display = "block";
    } else {
      book.style.display = "none";
    }

  });

}

window.onload = function () {

  addBook(
    "Harry Potter and the Sorcerer's Stone",
    "J.K. Rowling",
    "Fantasy",
    "https://covers.openlibrary.org/b/id/7984916-L.jpg",
    309
  );

  addBook(
    "The Hobbit",
    "J.R.R. Tolkien",
    "Fantasy",
    "https://covers.openlibrary.org/b/id/6979861-L.jpg",
    310
  );

  addBook(
    "1984",
    "George Orwell",
    "Dystopian",
    "https://covers.openlibrary.org/b/id/7222246-L.jpg",
    328
  );

};