// import * as books from "./books.js";
// books.fetchData();
const fetchData = async () => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=programming"
    );
    const data = await response.json();

    const books = data.items.map((book) => {
      return {
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        cover: book.volumeInfo.imageLinks.thumbnail,
        genres: book.volumeInfo.categories,
        pageCount: book.volumeInfo.pageCount,
        publishedDate: book.volumeInfo.publishedDate,
      };
    });
    await fetch("/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ books }),
    });
    console.log("Data sent to server");
  } catch (error) {
    console.error(error);
  }
};
fetchData();
const renderSpinner = function (parentEl) {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="../img/spinner.png"></use>
      </svg>
    </div>
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

//Sticky navigation - The Intersection Observer API
// const header = document.querySelector("header");
// const nav = document.querySelector("nav");
// const navHeight = nav.getBoundingClientRect().height;

// const stickyNav = function (entries) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });
// headerObserver.observe(header);
