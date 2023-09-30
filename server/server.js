import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { fetchData } from "./middleware/fetchData.js";
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
  return res
    .status(StatusCodes.OK)
    .json({
      message: "Working !",
      length: req.totalBlogs,
      longestBlog: req.longestBlog,
      blogsWithPrivacy: req.blogsWithPrivacy,
    });
});

app.listen(PORT, () => {
  console.log(`server started on port : ${PORT}`);
});
