const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    username: { type: String, required: true }, 
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    likes: { type: Number, default: 0 },
    comments: [
      {
        username: { type: String, required: true }, 
        content: { type: String, required: true },
      },
    ],
  },
  {
    versionKey: false,
  }
);

const BlogModel = mongoose.model("Blog", blogSchema);

module.exports = {
  BlogModel,
};
