if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
} //load environment variables from the .env file using the dotenv module and make them available in my app

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const indexRouter = require("./routes/index");

app.use(express.static("public"));

app.set("layout", "layouts/layout");
app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({ extended: false })); //getting data from forms

const mangoose = require("mongoose");
mangoose.connect(process.env.Database_URL, { useNewUrlParser: true });
const db = mangoose.connection;
db.once("open", () => console.log("Connected to Mongoose"));
db.on("error", (error) => console.error(error));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Serverul rulează la adresa http://localhost:3000`);
});
