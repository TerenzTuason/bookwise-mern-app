require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors')

const bookRoutes = require("./routes/books");

// express app
const app = express();

// middleware
app.use(express.json());

// used for cross origin (backend to frontend)
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// uses the routes
app.use("/api/books", bookRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
