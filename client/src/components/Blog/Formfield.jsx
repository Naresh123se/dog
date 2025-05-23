import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function Formfield({
  register,
  errors,
  imagePreviews,
  errorMessage,
  handleImageChange,
  removeImage,
  existingImages,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left side: Form Data */}
      <div className="space-y-6">
        {/* Blog Title */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Blog Title
          </label>
          <Input
            {...register("title", {
              required: "Title is required",
            })}
            placeholder="Enter blog title"
            className={`w-full ${errors.title ? "border-red-500" : ""}`}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Excerpt</label>
          <Input
            {...register("excerpt", {
              required: "Excerpt is required",
              maxLength: {
                value: 160,
                message: "Excerpt should be less than 160 characters",
              },
            })}
            placeholder="Short description of the blog"
            className={`w-full ${errors.excerpt ? "border-red-500" : ""}`}
          />
          {errors.excerpt && (
            <p className="text-red-500 text-xs mt-1">
              {errors.excerpt.message}
            </p>
          )}
        </div>

        {/* Author */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Author</label>
          <Input
            {...register("author", {
              required: "Author name is required",
            })}
            placeholder="Author name"
            className={`w-full ${errors.author ? "border-red-500" : ""}`}
          />
          {errors.author && (
            <p className="text-red-500 text-xs mt-1">{errors.author.message}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <Input
            {...register("category", {
              required: "Category is required",
            })}
            placeholder="Blog category"
            className={`w-full ${errors.category ? "border-red-500" : ""}`}
          />
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      {/* Right side: Image Upload */}
      <div className="space-y-4 mt-6">
        <div className="space-y-2">
          <Input
            id="photo"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleImageChange}
          />
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => document.getElementById("photo")?.click()}
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Upload Blog Images
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Max size: 5MB per image
          </p>
        </div>
        <div className="space-y-2">
          {/* Display existing images */}
          {existingImages?.map((preview, index) => (
            <div key={index} className="relative">
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                className="h-[120px] justify-self-center object-cover rounded-md"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 rounded-full"
                onClick={() => removeImage(index, false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {/* Display new images */}
          <div className="flex flex-wrap space-x-4 justify-self-center overflow-x-auto">
            {imagePreviews?.map((preview, index) => (
              <div key={index} className="relative w-auto">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="h-[120px] w-auto object-cover rounded-md"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 rounded-full"
                  onClick={() => removeImage(index, true)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {!existingImages?.length && !imagePreviews?.length && (
            <div className="h-[120px] w-full rounded-md border border-dashed border-gray-200 flex items-center justify-center">
              <div className="text-sm text-muted-foreground text-center p-4">
                <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No images uploaded</p>
              </div>
            </div>
          )}
        </div>
        {errorMessage && (
          <p className="text-sm text-red-500 text-center">{errorMessage}</p>
        )}
      </div>

      {/* Content */}
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium text-gray-700">Content</label>
        <Textarea
          {...register("content", {
            required: "Content is required",
          })}
          placeholder="Write your blog content here..."
          rows="10"
          className={`w-full ${errors.content ? "border-red-500" : ""}`}
        />
        {errors.content && (
          <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
        )}
      </div>
    </div>
  );
}
