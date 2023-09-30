import express from "express";
import cors from "cors";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { fetchData } from "./middleware/fetchData.js";
import dotenv from "dotenv";
import _ from "lodash"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "SubSpace Backend Development Internship Task",
    doneBy: "V. Gnana chandra",
  });
});

app.use(fetchData);
app.get("/api/blog-stats", (req, res) => {
  return res.status(StatusCodes.OK).json({
    message: "Working !",
    totalBlogs: req.totalBlogs,
    longestBlogTitle: req.longestBlogTitle,
    blogsWithPrivacyWord: req.blogsWithPrivacyWord,
    uniqueTitles: req.uniqueTitles,
  });
});

app.get("/api/blog-search", (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "search query not received !" });
  }
  const blogs = req.blogs;
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(query)
  );
  if (_.size(filteredBlogs) === 0) {
    return res
      .status(StatusCodes.OK)
      .json({
        message: `No blogs found for search query : ${query}`,
        blogs: [],
      });
  }
  return res
    .status(StatusCodes.OK)
    .json({ message: "Blog search end point", blogs: filteredBlogs });
});

app.listen(PORT, () => {
  console.log(`server started on port : ${PORT}`);
});
