import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { ImageIcon, X } from "lucide-react";
import { toast } from "react-toastify";
import { color } from "framer-motion";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 5; // Maximum number of images allowed

export const AddEditDogForm = ({ dog, onClose, onSubmit, isLoading }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: dog || {
      name: "",
      age: "",
      breed: "",
      location: "",
      price: "",
      bio: "",
      photos: [], // Changed to array for multiple images
      gender: "male",
      size: "Medium",
      color: "",
    },
  });

  const breeds = [
    "Labrador Retriever",
    "German Shepherd",
    "Golden Retriever",
    "Bulldog",
    "Beagle",
    "Poodle",
    "Rottweiler",
    "Yorkshire Terrier",
  ];

  const sizes = ["Small", "Medium", "Large", "X-Large"];

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      setErrorMessage("Please select at least one image.");
      return;
    }

    // Check total images won't exceed limit
    if (imagePreviews.length + files.length > MAX_IMAGES) {
      setErrorMessage(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    // Validate file sizes
    const oversizedFiles = files.filter((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      toast.error(`Some images exceed 5MB limit`);
      return;
    }

    setUploading(true);
    setErrorMessage("");

    // Process each file to base64
    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((newBase64Images) => {
        setImagePreviews((prev) => [...prev, ...newBase64Images]);
        setValue("photos", [...watch("photos"), ...newBase64Images], {
          shouldValidate: true,
          shouldDirty: true,
        });
      })
      .catch((error) => {
        toast.error("Failed to process images");
        console.error("Image processing error:", error);
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const removeImage = (index) => {
    const newPreviews = [...imagePreviews];
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
    setValue("photos", newPreviews, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // Set form values when select changes
  const handleSelectChange = (name, value) => {
    setValue(name, value, { shouldValidate: true });
  };

  // Initialize form with dog data
  useEffect(() => {
    if (dog) {
      reset({
        ...dog,
        photos: dog.photos || [], // Ensure photos is an array
      });
      if (dog.photos?.length) {
        setImagePreviews(dog.photos);
      }
    } else {
      reset({
        name: "",
        age: "",
        breed: "",
        location: "",
        price: "",
        bio: "",
        photos: [],
        gender: "male",
        size: "Medium",
        color: "",
      });
      setImagePreviews([]);
    }
  }, [dog, reset]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {dog ? "Edit Dog Profile" : "Add New Dog"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <ScrollArea className="h-[calc(100vh-100px)]">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
                className={errors.name && "border-red-500"}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="age">Age (years) *</Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  max="30"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 0, message: "Age must be positive" },
                    max: { value: 30, message: "Age must be less than 30" },
                  })}
                  className={errors.age && "border-red-500"}
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.age.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  value={watch("gender")}
                  onValueChange={(value) => handleSelectChange("gender", value)}
                >
                  <SelectTrigger className={errors.gender && "border-red-500"}>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="breed">Breed *</Label>
                <Select
                  value={watch("breed")}
                  onValueChange={(value) => handleSelectChange("breed", value)}
                >
                  <SelectTrigger className={errors.breed && "border-red-500"}>
                    <SelectValue placeholder="Select breed" />
                  </SelectTrigger>
                  <SelectContent>
                    {breeds.map((breed) => (
                      <SelectItem key={breed} value={breed}>
                        {breed}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.breed && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.breed.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="size">Size *</Label>
                <Select
                  value={watch("size")}
                  onValueChange={(value) => handleSelectChange("size", value)}
                >
                  <SelectTrigger className={errors.size && "border-red-500"}>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.size && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.size.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                {...register("location", { required: "Location is required" })}
                className={errors.location && "border-red-500"}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                {...register("price", { required: "Price is required" })}
                className={errors.price && "border-red-500"}
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                {...register("bio")}
                rows={3}
                placeholder="Tell us about this dog's personality, habits, etc."
              />
            </div>

            {/* Image Upload Section */}
            <div className="space-y-2">
              <Label>Photos (Max {MAX_IMAGES})</Label>
              <Input
                id="photos"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
                disabled={uploading || imagePreviews.length >= MAX_IMAGES}
              />
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById("photos")?.click()}
                disabled={uploading || imagePreviews.length >= MAX_IMAGES}
              >
                <ImageIcon className="mr-2 h-4 w-4" />
                {uploading ? "Uploading..." : "Upload Photos"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Max {MAX_IMAGES} images, 5MB each (JPEG, PNG)
              </p>
            </div>

            {/* Image Previews */}
            <div className="space-y-2">
              {imagePreviews.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {imagePreviews.map((base64, index) => (
                    <div key={index} className="relative">
                      <img
                        src={base64}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-5 w-5 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-24 w-full rounded-md border border-dashed border-gray-200 flex items-center justify-center">
                  <div className="text-sm text-muted-foreground text-center p-4">
                    <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No photos uploaded</p>
                  </div>
                </div>
              )}
              {errorMessage && (
                <p className="text-sm text-red-500 text-center">
                  {errorMessage}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || uploading}>
                {isLoading ? "Processing..." : dog ? "Update" : "Add Dog"}
              </Button>
            </div>
          </ScrollArea>
        </form>
      </DialogContent>
    </Dialog>
  );
};
