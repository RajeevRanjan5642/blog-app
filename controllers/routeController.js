const Blog = require("./../models/blog");

exports.getBlogs = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) =>
      res.render("blogs/index", { title: "All Blogs", blogs: result })
    )
    .catch((err) => console.log(err));
};

exports.postBlog = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => res.redirect("/blogs"))
    .catch((err) => console.log(err));
};

exports.getBlog = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => console.log(err));
};

exports.deleteBlog = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({
        redirect: "/blogs",
      });
    })
    .catch((err) => res.status(404).render('404',{title:'Blog not found'}));
};
