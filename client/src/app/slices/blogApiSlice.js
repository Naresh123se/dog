// api/blogApiSlice.js
import { blog_url } from "../constants";
import { apiSlice } from "./apiSlice";

export const blogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: `${blog_url}/create-blog`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    updateBlog: builder.mutation({
      query: (data) => ({
        url: `${blog_url}/update-blog/${data.id}`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),

    getAllBlogs: builder.query({
      query: () => ({
        url: `${blog_url}/all-blogs`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getBlogById: builder.query({
      query: (id) => ({
        url: `${blog_url}/blog/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    getBlogsByCategory: builder.query({
      query: (category) => ({
        url: `${blog_url}/blogs-by-category/${category}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `${blog_url}/delete-blog/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
  useGetBlogsByCategoryQuery,
  useDeleteBlogMutation,
} = blogApiSlice;
