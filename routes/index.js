const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

router.use(bodyParser.json());

router.get("/", (req, res) => {
  res.render("index.ejs");
});

const fetchBookData = async () => {
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

    return books;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

router.get("/books", async (req, res) => {
  try {
    const books = await fetchBookData();

    res.render("books.ejs", { books });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// router.post("/books", (req, res) => {
//   console.log(req.body);
//   console.log("hei");
//   const { books } = req.body;
//   console.log(books);
//   res.render("books.ejs", { books: books });
// });

router.get("/login", (req, res) => {
  res.render("login.ejs", { layout: false });
});
router.get("/signup", (req, res) => {
  res.render("signup.ejs", { layout: false });
});
router.post("/login", (req, res) => {});
router.post("/signup", (req, res) => {});

router.get("*", (req, res) => {
  res.render("404.ejs", { layout: false });
});
module.exports = router;
