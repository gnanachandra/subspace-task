import express from "express";
import cors from "cors";
import { ErrorMiddleWare } from "./middleware/error.js";
import { StatusCodes } from "http-status-codes";
import { fetchData } from "./middleware/fetchData.js";
import _ from "lodash";
import { memorizeSearch } from "./utils/memorizeSearch.js";

const app = express();
const PORT =  5000;
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
    doneBy: "V.Gnana chandra",
    portfolio: "https://portfolio-gnanachandra.vercel.app/",
    deployedIn : "Google Cloud App Engine"
  });
});


app.use(fetchData);
app.get("/api/blog-stats", (req, res) => {
  return res.status(StatusCodes.OK).json({
    totalBlogs: req.totalBlogs,
    longestBlogTitle: req.longestBlogTitle,
    blogsWithPrivacyWord: req.blogsWithPrivacyWord,
    uniqueTitles: req.uniqueTitles,
  });
});

app.get("/api/blog-search", (req, res) => {
  const { query } = req.query;
  //checking if a valid query string is received
  if (!query) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "search query not received !" });
  }
  const blogs = req.blogs;
  
  //getting filtered blogs from the memorizeSearch
  const filteredBlogs = memorizeSearch(blogs, query);

  if (_.size(filteredBlogs) === 0) {
    return res.status(StatusCodes.OK).json({message: `No blogs found for search query : ${query}`,blogs: []});
  }
  return res.status(StatusCodes.OK).json({ message: "Blog search end point", blogs: filteredBlogs });
  
});

app.listen(PORT, () => {
  console.log(`server started on port : ${PORT}`);
});

//custom error handling middleware
app.use(ErrorMiddleWare);
