// import express
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

// express app
const app = express();

//connect to mongoDB
const connStr =
  "mongodb+srv://rajeevranjan31012003:IgwQgH87BzHz1uiB@cluster0.i4rwp.mongodb.net/node-api?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(connStr)
  .then(() =>
    app.listen(3000, () => {
      console.log("server is listening at port 3000...");
    })
  )
  .catch((err) => console.log(err));
// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// morgan is a http request logger middleware
app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
app.get("/about", (req, res) => {
  res.render("blogs/about", { title: "About" });
});
app.get("/blogs/create", (req, res) => {
  res.render("blogs/create", { title: "Create a new blog" });
});

//blog routes
app.use("/blogs", blogRoutes);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
