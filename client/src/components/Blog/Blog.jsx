import React, { useState } from "react";
import AddBlogForm from "./AddBlogForm";
import EditBlogForm from "./EditBlogForm";

const BlogCard = () => {
  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "Essential Tips for Dog Care",
      date: "2024-02-20",
      image:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      excerpt:
        "Learn the basics of keeping your furry friend healthy and happy with these essential care tips.",
      author: "Dr. Sarah Johnson",
      category: "Pet Care",
    },
    {
      id: 2,
      title: "Best Dog Breeds for Families",
      date: "2024-02-19",
      image:
        "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      excerpt:
        "Discover which dog breeds are ideal for families with children and why they make perfect companions.",
      author: "Mike Thompson",
      category: "Breeds",
    },
    {
      id: 3,
      title: "Training Your Puppy: The Basics",
      date: "2024-02-18",
      image:
        "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      excerpt:
        "Start your puppy training journey with these fundamental tips and techniques.",
      author: "Emma Davis",
      category: "Training",
    },
  ]);

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleAddPost = (newPost) => {
    setBlogPosts([...blogPosts, { id: blogPosts.length + 1, ...newPost }]);
    setIsAddFormOpen(false);
  };

  const handleEditPost = (updatedPost) => {
    setBlogPosts(
      blogPosts.map((post) =>
        post.id === selectedPost.id ? { ...post, ...updatedPost } : post
      )
    );
    setIsEditFormOpen(false);
    setSelectedPost(null);
  };

  const openEditForm = (post) => {
    setSelectedPost(post);
    setIsEditFormOpen(true);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.date}</span>
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
                    <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
                      Read More <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © 2024 Paws & Tales. All rights reserved.
          </p>
        </div>
      </footer>

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

export default BlogCard;
