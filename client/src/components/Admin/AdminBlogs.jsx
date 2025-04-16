import React, { useState } from "react";
import { useGetAllBlogsQuery } from "@/app/slices/adminApiSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Search,
  MoreHorizontal,
  PenTool,
  Calendar,
  Tag,
  Eye,
  Edit,
  Trash,
  Plus,
} from "lucide-react";

const AdminBlogs = () => {
  const { data, isLoading, error } = useGetAllBlogsQuery();
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-center text-red-500">
        Error loading blogs: {error.toString()}
      </div>
    );

  // Filter blogs based on search term
  const filteredBlogs = data?.blogs?.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate text if it's too long
  const truncateText = (text, maxLength = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center text-2xl">
              <FileText className="mr-2" />
              Blog Management
            </CardTitle>
            <CardDescription>
              Manage all blog posts. Total: {data?.count || 0} blogs
            </CardDescription>
          </div>
          <div className="flex items-center w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search blogs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableCaption>A list of all blog posts</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">#</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title & Content</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs?.map((blog, index) => (
                <TableRow key={blog._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    {blog.images && blog.images[0] ? (
                      <div className="h-16 w-20 rounded overflow-hidden">
                        <img
                          src={blog?.images[0]?.url}
                          alt={blog.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-20 bg-gray-200 rounded flex items-center justify-center">
                        <FileText className="text-gray-500" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{blog.title}</div>
                      <div className="text-sm text-gray-500">
                        {truncateText(blog.excerpt)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <PenTool className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{blog.author}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="flex items-center">
                      <Tag className="h-3 w-3 mr-1" />
                      {blog.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(blog.date)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <Eye className="mr-2 h-4 w-4" /> View Blog
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <Edit className="mr-2 h-4 w-4" /> Edit Blog
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center text-red-600">
                          <Trash className="mr-2 h-4 w-4" /> Delete Blog
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminBlogs;
