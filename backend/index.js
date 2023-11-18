const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const Book = require("./models/booksModel");
const app = express();
const bookRouter = require("../backend/routes/bookRouter");
const cors = require("cors");
dotenv.config();

app.use(express.json());

// default FOR ALL ORIGINS
// app.use(cors());

//CUSTOM ORIGIN
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type"],
  })
);

const PORT = 5000;
const con = process.env.MONGO_URL;

app.use("/books", bookRouter);

mongoose
  .connect(con)
  .then(() => {
    console.log("Connected to Db");
  })
  .catch((err) => {
    console.log({ message: "Internal Server Error", error: err.message });
  });

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
