const renderSpinner = function (parentEl) {
  const markup = `
    <div class="spinner">
      <img src="../img/spinner.png" alt="Loading..." />

    </div>
  `;
  parentEl.innerHTML = markup;
  parentEl.style.display = "block";
};
const removeSpinner = (parentEl) => {
  const spinnerEl = parentEl.querySelector(".spinner");
  if (spinnerEl) {
    spinnerEl.remove();
  }
  parentEl.style.display = "grid";
};
const renderError = function (parentEl, errMsg) {
  const errEl = document.createElement("h3");
  errEl.textContent = errMsg;
  errEl.style.color = "red";
  parentEl.innerHTML = "";
  parentEl.appendChild(errEl);
};
// const renderBooks = function (parentEl, books) {
//   const markup = `
//     <div class="book">
//       <div class="book-cover">
//         <img src="${books.cover}" alt="${books.title}" />
//       </div>
//       <div class="book-info">
//       <h4 class="book-genre">${books.genres}</h4>
//         <h3 class="book-title">${books.title}</h3>
//         <p class="book-author">${books.authors}</p>
//       </div>
//     </div>
//   `;
//   parentEl.insertAdjacentHTML("beforeend", markup);
// };
const searchInput = document.getElementById("title");
const searchButton = document.getElementsByTagName("button")[0];
const booksContainer = document.querySelector("#book-grid");

// search books from api
// searchButton.addEventListener("click", async (e) => {
//   e.preventDefault();

//   const searchTerm = searchInput.value.trim().toLowerCase();
//   console.log(searchTerm);

//   if (!searchTerm) {
//     renderError(booksContainer, "Please enter a search term!");
//     return;
//   }

//   try {
//     // Render spinner
//     renderSpinner(booksContainer);
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     const response = await fetch(
//       `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
//         searchTerm
//       )}&maxResults=9`
//     );
//     const data = await response.json();

//     if (!data.items) {
//       renderError(booksContainer, "No items found in the response data");
//     }
//     console.log(data.items);
//     const books = data.items
//       .filter((book) => {
//         return (
//           book.volumeInfo.title &&
//           book.volumeInfo.authors &&
//           book.volumeInfo.description &&
//           book.volumeInfo.imageLinks.thumbnail &&
//           book.volumeInfo.categories &&
//           book.volumeInfo.pageCount &&
//           book.volumeInfo.publishedDate
//         );
//       })
//       .map((book) => {
//         return {
//           title: book.volumeInfo.title,
//           authors: book.volumeInfo.authors,
//           description: book.volumeInfo.description,
//           cover: book.volumeInfo.imageLinks.thumbnail,
//           genres: book.volumeInfo.categories,
//           pageCount: book.volumeInfo.pageCount,
//           publishedDate: book.volumeInfo.publishedDate,
//         };
//       });
//     console.log(books, "from client");
//     await fetch("/books", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ books: books }),
//     });
//     console.log("Data sent to server");
//     removeSpinner(booksContainer);
//     // booksContainer.innerHTML = "";
//     // books.forEach((book) => renderBooks(booksContainer, book));
//   } catch (error) {
//     renderError(booksContainer, error.message);
//   }
// });

// STICKY NAVIGATION
// select first section from the DOM
const firstSection = document.querySelector("section:first-of-type");
const nav = document.querySelector("nav");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(firstSection);

window.addEventListener("load", function () {
  // add id="active" to the link in the nav which has the same href as the current page
  const links = document.querySelectorAll(".nav__link");
  console.log(links);

  links.forEach((link) => {
    if (link.href === window.location.href) link.classList.add("active");
  });
});

const menuBtn = document.querySelector(".nav__menu--btn");
menuBtn.addEventListener("click", function (e) {
  e.preventDefault();
});
