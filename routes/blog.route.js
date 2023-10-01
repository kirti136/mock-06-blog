const { Router } = require("express");
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  commentOnBlog,
} = require("../controllers/blog.controller");
const { authenticateUser } = require("../middlewares/auth.middleware")
const blogRouter = Router();

blogRouter.post("/blogs", authenticateUser, createBlog);
blogRouter.get("/blogs", getAllBlogs);
// blogRouter.get("/blogs/search", searchByTitle);
// blogRouter.get("/blogs/category", getByCategory);
// blogRouter.get("/blogs", sortByDateAsc);
blogRouter.patch("/blogs/:id", authenticateUser, updateBlog);
blogRouter.delete("/blogs/:id", authenticateUser, deleteBlog);
blogRouter.patch("/blogs/:id/like", likeBlog);
blogRouter.patch("/blogs/:id/comment", commentOnBlog);

module.exports = {
  blogRouter,
};
