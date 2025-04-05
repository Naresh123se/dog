import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Formfield from "./Formfield";
import { useState } from "react";
import { useCreateBlogMutation, useGetAllBlogsQuery } from "@/app/slices/blogApiSlice";

function AddBlog({ onSuccess }) {
  const [imagePreviews, setImagePreviews] = useState([]);
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const [errorMessage, setErrorMessage] = useState("");
  const [addBlog, { isLoading }] = useCreateBlogMutation();
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
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      category: "",
      author: "",
      images: [],
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      setErrorMessage("Please select at least one image.");
      return;
    }

    let validImages = [];
    files.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`Image ${file.name} exceeds 5MB limit`);
      } else {
        validImages.push(file);
      }
    });

    if (validImages.length > 0) {
      validImages.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagePreviews((prev) => [...prev, reader.result]);
            setValue("images", [...(getValues("images")) || [], reader.result]);
            setErrorMessage("");
          }
        };
        reader.readAsDataURL(file);
      });
    } else if (imagePreviews.length === 0) {
      setErrorMessage("Please upload at least one valid image.");
    }
  };

  const removeImage = (index) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    const currentImages = getValues("images") || [];
    setValue(
      "images",
      currentImages.filter((_, i) => i !== index)
    );

    if (imagePreviews.length === 1) {
      setErrorMessage("Please upload at least one image.");
    }
  };

  const onSubmit = async (data) => {
    if (imagePreviews.length === 0) {
      setErrorMessage("Please upload at least one image.");
      return;
    }

    try {
      const res = await addBlog(data).unwrap();
      refetch();
      reset();
      setImagePreviews([]);
      toast.success(res.message);
      onSuccess();
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error(error?.data?.message || "Failed to create blog post");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-6">
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
        />
      </div>

      <div className="pt-6 border-t border-gray-200">
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onSuccess}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-[#2F71F0] hover:bg-[#2F71F0]/90 text-white px-8"
            disabled={isLoading}
          >
            {isLoading ? "Publishing..." : "Publish Blog"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default AddBlog;