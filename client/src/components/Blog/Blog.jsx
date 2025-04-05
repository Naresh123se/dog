// components/Blog.jsx
import React, { useState } from "react";
import AddBlogForm from "./AddBlogForm";
import EditBlogForm from "./EditBlogForm";
import {
  useGetAllBlogsQuery,
   useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from "@/app/slices/blogApiSlice";
import { toast } from "react-toastify";

const Blog = () => {
  const {
    data: response = {},
    isLoading,
    isError,
    refetch,
  } = useGetAllBlogsQuery();
  const blogPosts = response.blogs || [];

  const [addBlog] = useCreateBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleAddPost = async (newPost) => {
    try {
      await addBlog(newPost).unwrap();
      toast.success("Blog post added successfully");
      refetch();
      setIsAddFormOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add blog post");
    }
  };

  const handleEditPost = async (updatedPost) => {
    console.log("first")
    try {
      await updateBlog({ id: selectedPost._id, ...updatedPost }).unwrap();
      toast.success("Blog post updated successfully");
      refetch();
      setIsEditFormOpen(false);
      setSelectedPost(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update blog post");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deleteBlog(postId).unwrap();
      toast.success("Blog post deleted successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete blog post");
    }
  };

  const openEditForm = (post) => {
    setSelectedPost(post);
    setIsEditFormOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="w-full h-56 bg-gray-300"></div>
                <div className="p-6 space-y-4">
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error loading blog posts
          </h2>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Paws & Tales Blog
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Your source for all things dogs and pets
            </p>
          </div>
          <button
            onClick={() => setIsAddFormOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Post
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {blogPosts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No blog posts found
            </h2>
            <p className="text-gray-600 mb-6">
              Start by adding your first blog post!
            </p>
            <button
              onClick={() => setIsAddFormOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create First Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={post.image || "/default-blog-image.jpg"}
                  alt={post.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 italic">
                      By {post.author}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditForm(post)}
                        className="text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        className="text-red-600 hover:text-red-800 font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Add Blog Form */}
      <AddBlogForm
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onSubmit={handleAddPost}
      />

      {/* Edit Blog Form */}
      <EditBlogForm
        isOpen={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        onSubmit={handleEditPost}
        blogPost={selectedPost}
      />
    </div>
  );
};

export default Blog;
