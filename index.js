require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db.js");
const { userRouter } = require("./routes/user.route.js");
const { blogRouter } = require("./routes/blog.route.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", userRouter);
app.use("/api", blogRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Blog App" });
});

let PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listening on port ${PORT}`);
});
