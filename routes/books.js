const router = express.Router();
const Book = require("../models/book");

// All books route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.title != null && req.query.title !== "") {
    //if the user has typed something in the search box
    searchOptions.title = new RegExp(req.query.title, "i"); // "i" means case insensitive
  }
  try {
    const books = await Book.find(searchOptions);
    res.render("books/index", {
      books: books,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});