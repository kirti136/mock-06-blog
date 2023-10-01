const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    userId: { type: String },
    username: { type: String },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date },
    likes: { type: Number, default: 0 },
    comments: [
      {
        username: { type: String },
        content: { type: String },
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
