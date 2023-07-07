const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const API_URL = require("../public/js/config");
const fetch = require("node-fetch");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const fetchBookData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!data.items) {
      throw new Error("No items found in the response data");
    }

    const books = data.items
      .filter((book) => {
        return (
          book.volumeInfo.title &&
          book.volumeInfo.authors &&
          book.volumeInfo.description &&
          book.volumeInfo.imageLinks.thumbnail &&
          book.volumeInfo.categories &&
          book.volumeInfo.pageCount &&
          book.volumeInfo.publishedDate
        );
      })
      .map((book) => {
        return {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          description: book.volumeInfo.description,
          cover:
            book.volumeInfo.imageLinks.thumbnail ||
            book.volumeInfo.imageLinks.smallThumbnail,
          genres: book.volumeInfo.categories,
          pageCount: book.volumeInfo.pageCount,
          publishedDate: book.volumeInfo.publishedDate,
        };
      });

    return books;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
router.get("/", async (req, res) => {
  try {
    const books = await fetchBookData();
    res.render("books.ejs", { books });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req, res) => {
  const searchTerm = req.body.title;
  books = await fetchBookData();
  if (!searchTerm || searchTerm === "") {
    res.render("books.ejs", { books });
    return;
  }
  books = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors.some((author) =>
        author.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      book.genres.some((genre) =>
        genre.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  });
  if (books.length === 0) {
    res.send("No books found!!");
  }
  res.render("books.ejs", { books });
});

module.exports = router;
