const cors = require("cors");
const express = require("express");

const UserController = require("./controller/User.controller");
const BookController = require("./controller/Book.controller");
const connection = require("./configs/db");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use("/user", UserController);
app.use("/book", BookController);

//END POINT INDEXING
app.get("/", async (req, res) => {
  res.status(200).json({
    endpoints: {
      user: {
        "/login": "login",
        "/sign": "Sign up",
      },
      book: {
        "/post": "To Post Book", //C
        "/getBooks": "To get all Books", //R
        "/delete/:BookId": "Delete Book", //U
        "/edit/:BookId": "Edit Book", //E
      },
    },
  });
});

const port = process.env.Port || 8080;
//STARTING THE SERVER
app.listen(port, async () => {
  try {
    connection;
    console.log("Connection Established With DB");
  } catch (e) {
    console.log("Error While Connecting To Database", e);
  }
  console.log("listening on", port);
});
