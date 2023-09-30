import asyncHandler from "express-async-handler";
import axios from "axios";
import _ from "lodash"
//fetchData middleware function to fetch the data from the api end point
export const fetchData = asyncHandler(async (req, res, next) => {
  const axiosResponse = await axios.get(
    `https://intent-kit-16.hasura.app/api/rest/blogs`,
    {
      headers: {
        "x-hasura-admin-secret":
          "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
      },
    }
  );

  //data received from the endpoint
  const blogs = axiosResponse.data.blogs;
  const totalBlogs = blogs.length;
  const longestBlog = _.maxBy(blogs, "title");
  const blogsWithPrivacy = blogs.filter((blog) =>
    blog.title.toLowerCase().includes("privacy")
  );
  const uniqueTitles = _.uniqBy(blogs, "title").map((blog) => blog.title);
		// console.log(blogs)
  req.totalBlogs = totalBlogs;
  req.longestBlog = longestBlog;
  req.blogsWithPrivacy = blogsWithPrivacy;
  next();
});
