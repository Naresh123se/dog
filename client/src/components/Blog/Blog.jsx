import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2, PlusIcon, Pen } from "lucide-react";
import {
  useGetAllBlogsQuery,
  useDeleteBlogMutation,
} from "@/app/slices/blogApiSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AddBlog from "./AddBlog";
import EditBlog from "./EditBlog";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Blog() {
  const { data, isLoading, refetch } = useGetAllBlogsQuery();
  const [deleteBlog, { isDeleting }] = useDeleteBlogMutation();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const blogPosts = Array.isArray(data?.blogs) ? data.blogs : [];
  const user = useSelector((state) => state.auth.user);
  const isOwner = blogPosts.map((post) => post?.owner === user?._id);

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id).unwrap();
      toast.success("Delete Sucesfully");
      refetch();
    } catch (error) {
      console.log(error);
    }
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
              {user?.role === "breeder" && (
                <Dialog
                  open={isAddDialogOpen}
                  onOpenChange={setIsAddDialogOpen}
                >
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
              )}
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
                  {user?.role === "breeder" && (
                    <Button
                      onClick={() => setIsAddDialogOpen(true)}
                      className="bg-[#2F71F0] hover:bg-[#2F71F0]/90 text-white px-8"
                    >
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Blog Post
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.map((post) => (
                    <article
                      key={post._id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl relative"
                    >
                      {post.images?.length > 0 ? (
                        <img
                          src={post.images[0].url}
                          alt={post.title}
                          className="w-full h-56 object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/400x225?text=No+Image";
                          }}
                        />
                      ) : (
                        <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full">
                            {post.category || "Uncategorized"}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt || "No excerpt provided"}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 italic">
                            By {post.author || "Unknown author"}
                          </span>

                          {isOwner && (
                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                className="w-8 h-8 text-gray-700 rounded-full shadow-lg bg-[#1DADC9] hover:bg-[#1DADC9]/90"
                                title="Edit Blog"
                                onClick={() => handleEditClick(post)}
                              >
                                <Pen className="w-4 h-4" />
                              </Button>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="destructive"
                                    className="w-8 h-8 rounded-full shadow-lg"
                                    title="Delete Blog"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will
                                      permanently delete your blog post.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDelete(post._id)}
                                      className="bg-red-600 hover:bg-red-700"
                                      disabled={isDeleting}
                                    >
                                      {isDeleting ? "Deleting..." : "Delete"}
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          )}
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
