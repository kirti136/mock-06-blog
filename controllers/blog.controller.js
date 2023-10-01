const { BlogModel } = require("../models/blog.model");
const { UserModel } = require("../models/user.model");


const getAllBlogs = async (req, res) => {
  try {
    const { title, category, sort, order } = req.query;

    const filter = {};
    if (title) {
      filter.title = { $regex: title, $options: 'i' };
    }

    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    const sortOptions = {};
    if (sort) {
      sortOptions[sort] = order && order.toLowerCase() === 'desc' ? -1 : 1;
    } else {
      sortOptions.date = 1;
    }

    const blogs = await BlogModel.find(filter).sort(sortOptions);

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    console.log(req);

    let userId = req.userId;
    console.log(userId)
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newBlog = new BlogModel({
      userId: user._id,
      username: user.username,
      title,
      content,
      category,
      date: new Date(),
      likes: 0,
      comments: [],
    });

    await newBlog.save();

    res.status(201).json({ message: "Blog created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const searchByTitle = async (req, res) => {
//   try {
//     const { title } = req.query;

//     if (!title) {
//       return res
//         .status(400)
//         .json({ error: "Title parameter is required for search" });
//     }

//     const blogs = await BlogModel.find({
//       title: { $regex: title, $options: "i" },
//     });

//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const getByCategory = async (req, res) => {
//   const { category } = req.query;

//   try {
//     const blogs = await BlogModel.find({ category });

//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const sortByDateAsc = async (req, res) => {
//   const { sort, order } = req.query;
//   let sortOptions = {};

//   if (sort) {
//     sortOptions[sort] = order && order.toLowerCase() === "desc" ? -1 : 1;
//   } else {
//     sortOptions.date = 1;
//   }

//   try {
//     const blogs = await BlogModel.find().sort(sortOptions);

//     res.status(200).json(blogs);
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { title, content, category },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await BlogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    if (blog.likes.includes(req.user.username)) {
      return res
        .status(400)
        .json({ error: "You have already liked this blog" });
    }

    blog.likes.push(req.user.username);

    await blog.save();

    res.status(200).json({ message: "Blog liked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const commentOnBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    blog.comments.push({
      username: req.user.username,
      content: text,
    });
    await blog.save();

    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  commentOnBlog,
};
