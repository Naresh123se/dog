import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Formfield from "./Formfield";
import { useState } from "react";
import { useUpdateBlogMutation, useGetAllBlogsQuery } from "@/app/slices/blogApiSlice";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function EditBlog({ blog, onSuccess }) {
  const [existingImages, setExistingImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const { refetch } = useGetAllBlogsQuery();

  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: blog,
  });

  useEffect(() => {
    if (blog) {
      reset(blog);
    }
    if (blog.images && Array.isArray(blog.images)) {
      setExistingImages(blog.images.map((img) => img.url));
    } else {
      setExistingImages([]);
    }
  }, [blog, reset]);

  const onSubmit = async (data) => {
    if (imagePreviews.length === 0 && existingImages.length === 0) {
      setErrorMessage("Please upload at least one image.");
      return;
    }
    try {
      const response = await updateBlog({
        ...data,
        id: blog._id,
        images: [...existingImages, ...imagePreviews],
      }).unwrap();
      toast.success(response.message);
      refetch();
      onSuccess();
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(error?.data?.message || "Failed to update blog post");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    files.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`Image ${file.name} exceeds 5MB limit`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagePreviews((prev) => [...prev, reader.result]);
          setValue("images", [...(getValues("images") )|| [], reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index, isNewImage) => {
    if (isNewImage) {
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
      const currentImages = getValues("images") || [];
      setValue(
        "images",
        currentImages.filter((_, i) => i !== index)
      );
    } else {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Formfield
        control={control}
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        imagePreviews={imagePreviews}
        setImagePreviews={setImagePreviews}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        handleImageChange={handleImageChange}
        removeImage={removeImage}
        existingImages={existingImages}
      />
      <div className="flex justify-end gap-4 mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-[#2867EC] hover:bg-[#2867EC]/90 text-white"
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Blog Post"}
        </Button>
      </div>
    </form>
  );
}