const { Router } = require("express");
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  commentOnBlog,
} = require("../controllers/blog.controller");
const blogRouter = Router();

blogRouter.post("/blogs", createBlog);
blogRouter.get("/blogs", getAllBlogs);
// blogRouter.get("/blogs/search", searchByTitle);
// blogRouter.get("/blogs/category", getByCategory);
// blogRouter.get("/blogs", sortByDateAsc);
blogRouter.patch("/blogs/:id", updateBlog);
blogRouter.delete("/blogs/:id", deleteBlog);
blogRouter.patch("/blogs/:id/like", likeBlog);
blogRouter.patch("/blogs/:id/comment", commentOnBlog);

module.exports = {
  blogRouter,
};
