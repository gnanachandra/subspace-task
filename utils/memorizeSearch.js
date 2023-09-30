import _ from "lodash";
export const memorizeSearch = _.memoize((blogs, query) => {
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(query)
  );
  return filteredBlogs
});
