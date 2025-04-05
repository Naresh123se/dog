import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { PenBoxIcon, PlusIcon } from "lucide-react";
import { useGetAllBlogsQuery } from "@/app/slices/blogApiSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddBlog from "./AddBlog";
import EditBlog from "./EditBlog";

function Blog() {
  const { data, isLoading } = useGetAllBlogsQuery();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const blogPosts = Array.isArray(data?.blogs) ? data.blogs : [];

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setIsEditDialogOpen(true);
  };

  return (
    <ScrollArea className="flex-1 h-[calc(100vh-65px)]">
      <div className="mt-10 bg-gray-50">
        <div className="container mx-auto px-6 py-8">
          <div className="overflow-auto bg-gray-50 w-full py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex justify-between">
              <div className="flex flex-col gap-1 mb-6">
                <h1 className="text-3xl flex items-center gap-1 font-bold text-gray-900">

                  Blog Posts
                </h1>
                <p className="text-gray-500 mt-1">
                  Latest articles and updates
                </p>
              </div>

              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#2F71F0] hover:bg-[#2F71F0]/90 text-white px-8">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Blog Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Blog Post</DialogTitle>
                  </DialogHeader>
                  <AddBlog onSuccess={() => setIsAddDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-pulse text-xl font-semibold text-gray-700">
                    Loading blog posts...
                  </div>
                </div>
              ) : blogPosts.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    No blog posts found
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Start by adding your first blog post!
                  </p>
                  <Button
                    onClick={() => setIsAddDialogOpen(true)}
                    className="bg-[#2F71F0] hover:bg-[#2F71F0]/90 text-white px-8"
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Blog Post
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.map((post) => (
                    <article
                      key={post._id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      {post.images && post.images.length > 0 ? (
                        <img
                          src={post.images[0].url}
                          alt={post.title}
                          className="w-full h-56 object-cover"
                        />
                      ) : (
                        <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full">
                            {post.category}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
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
                          <Button
                            variant="ghost"
                            onClick={() => handleEditClick(post)}
                          >
                            <PenBoxIcon className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
          </DialogHeader>
          {selectedBlog && (
            <EditBlog
              blog={selectedBlog}
              onSuccess={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </ScrollArea>
  );
}

export default Blog;
