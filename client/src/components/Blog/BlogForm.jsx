// components/BlogForm.jsx
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { ImageIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

const BlogForm = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  defaultValues = null,
  mode = "add" // 'add' or 'edit'
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (defaultValues) {
      reset({
        title: defaultValues.title,
        author: defaultValues.author,
        date: defaultValues.date?.split("T")[0],
        category: defaultValues.category,
        excerpt: defaultValues.excerpt,
      });
      
      if (defaultValues.image) {
        setImagePreviews([defaultValues.image]);
      }
    } else {
      reset();
      setImagePreviews([]);
      setImageFiles([]);
    }
  }, [defaultValues, reset]);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const handleImageChange = (e) => {
  const files = Array.from(e.target.files || []);
  setErrorMessage("");

  if (files.length === 0) {
    setErrorMessage("Please select at least one image");
    return;
  }

  // Filter valid images
  const validImages = files.filter((file) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`Image ${file.name} exceeds 5MB limit`);
      return false;
    }
    return true;
  });

  if (validImages.length === 0) {
    setErrorMessage("Please upload at least one valid image");
    return;
  }

  // Create previews and update state
  validImages.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImagePreviews((prev) => [...prev, reader.result]);
        setImageFiles((prev) => [...prev, file]);
      }
    };
    reader.readAsDataURL(file);
  });
};

const removeImage = (index) => {
  setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  setImageFiles((prev) => prev.filter((_, i) => i !== index));

  // Clear error if we have remaining images
  if (imagePreviews.length > 1) {
    setErrorMessage("");
  }
};

const handleFormSubmit = async (data) => {
    console.log(data)
    console.log(imagePreviews)
  try {
    // Validate at least one image exists
    if (imagePreviews.length === 0) {
      setErrorMessage("Please upload at least one image");
      return;
    }

    const formData = new FormData();

    // Append text fields
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append image files
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    // If editing and no new images, keep the existing image URL
    if (
      mode === "edit" &&
      imageFiles.length === 0 &&
      imagePreviews.length > 0
    ) {
      formData.append("existingImage", imagePreviews[0]);
    }

    await onSubmit(formData);
    reset();
    setImagePreviews([]);
    setImageFiles([]);
  } catch (error) {
    toast.error("Failed to submit form");
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === "add" ? "Add New Blog Post" : "Edit Blog Post"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter blog title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Author
            </label>
            <input
              {...register("author", { required: "Author is required" })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter author name"
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="Pet Care">Pet Care</option>
              <option value="Breeds">Breeds</option>
              <option value="Training">Training</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="w-full space-y-4">
            <div className="space-y-2">
              <input
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
                Upload Image
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Max size: 5MB per image
              </p>

              {/* Image previews */}
              <div className="grid grid-cols-3 gap-2">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index}`}
                      className="h-24 w-full object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              {errorMessage && (
                <p className="text-sm text-red-500 text-center">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Excerpt
            </label>
            <textarea
              {...register("excerpt", { required: "Excerpt is required" })}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Enter a short description"
            />
            {errors.excerpt && (
              <p className="text-red-500 text-sm mt-1">
                {errors.excerpt.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-md border border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {mode === "add" ? "Add Post" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;