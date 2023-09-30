import asyncHandler from "express-async-handler";
import axios from "axios";
import _ from "lodash";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = resolve(__dirname, "../../server/.env");
config({ path: envPath });

//fetchData middleware function to fetch the data from the api end point
export const fetchData = asyncHandler(async (req, res, next) => {
 
    const axiosResponse = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      {
        headers: {
          "x-hasura-admin-secret": `${process.env.API_KEY}`,
        },
      }
    );
  

  //data received from the endpoint
  const blogs = axiosResponse.data.blogs;

  //task - 2

  //1. Calculate the total number of blogs fetched.
  const totalBlogs = _.size(blogs);

  //2. Find the blog with the longest title.
  let longestTitleLength = 1;
  let longestTitleBlog = {};
  _.forEach(blogs, function (blog) {
    let blogTitleLength = _.size(blog.title);
    if (blogTitleLength > longestTitleLength) {
      longestTitleLength = blogTitleLength;
      longestTitleBlog = blog;
    }
  });

  //3. Determine the number of blogs with titles containing the word "privacy."
  let count = 0;
  _.forEach(blogs, function (blog) {
    if (blog.title.toLowerCase().includes("privacy")) {
      count = count + 1;
    }
  });

  //4. Create an array of unique blog titles (no duplicates).
  const uniqueTitles = _.map(_.uniqBy(blogs, "title"), "title");
  req.blogs = blogs;
  req.totalBlogs = totalBlogs;
  req.longestBlogTitle = longestTitleBlog.title;
  req.blogsWithPrivacyWord = count;
  req.uniqueTitles = uniqueTitles;

  next();
});
