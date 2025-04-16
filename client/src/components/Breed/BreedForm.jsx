import { useForm } from "react-hook-form";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { ImageIcon, X } from "lucide-react";
import { toast } from "react-toastify";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGES = 5; // Maximum number of images allowed

const BreedForm = ({ breed, onSubmit, onClose, isLoading }) => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isDirty, errors },
  } = useForm({
    defaultValues: {
      name: "",
      origin: "",
      size: "",
      lifespan: "",
      temperament: "",
      grooming: "",
      exercise: "",
      diet: "",
      healthIssues: "",
      energyLevel: "",
      hypoallergenic: false,
      images: [],
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      setErrorMessage("Please select at least one image.");
      return;
    }
    if (imagePreviews.length + files.length > MAX_IMAGES) {
      setErrorMessage(`Maximum ${MAX_IMAGES} images allowed`);
      return;
    }

    const oversizedFiles = files.filter((file) => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      toast.error(`Some images exceed 5MB limit`);
      return;
    }

    setUploading(true);
    setErrorMessage("");

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
        setValue("images", [...watch("images"), ...newBase64Images], {
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
    setValue("images", newPreviews, { shouldDirty: true });
  };

  useEffect(() => {
    if (breed) {
      reset({
        name: breed.name || "",
        origin: breed.origin || "",
        size: breed.size || "",
        lifespan: breed.lifespan || "",
        temperament: breed.temperament || "",
        grooming: breed.grooming || "",
        exercise: breed.exercise || "",
        diet: breed.diet || "",
        healthIssues: breed.healthIssues || "",
        energyLevel: breed.energyLevel || "",
        hypoallergenic: breed.hypoallergenic || false,
        images: breed.images || [],
      });
      if (breed.images?.length) {
        setImagePreviews(breed.images);
        setImagePreviews(breed.images.map((img) => img.url));
      }
    } else {
      reset({
        name: "",
        origin: "",
        size: "",
        lifespan: "",
        temperament: "",
        grooming: "",
        exercise: "",
        diet: "",
        healthIssues: "",
        energyLevel: "",
        hypoallergenic: false,
        images: [],
      });
      setImagePreviews([]);
    }
  }, [breed, reset]);

  const onFormSubmit = (data) => {
    if (imagePreviews.length === 0) {
      setErrorMessage("At least one image is required");
      return;
    }

    const formattedData = {
      ...data,
      _id: breed?._id,
      hypoallergenic:
        data.hypoallergenic === true || data.hypoallergenic === "true",
      images: imagePreviews,
    };
    onSubmit(formattedData);
  };

  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle>{breed ? "Edit Breed" : "Add New Breed"}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid gap-4 py-4 px-1">
            <div className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Origin */}
              <div>
                <Label htmlFor="origin">Origin *</Label>
                <Input
                  id="origin"
                  {...register("origin", { required: "Origin is required" })}
                />
                {errors.origin && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.origin.message}
                  </p>
                )}
              </div>

              {/* Size */}
              <div>
                <Label htmlFor="size">Size *</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("size", value, { shouldDirty: true })
                  }
                  value={watch("size") || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Small">Small</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Large">Large</SelectItem>
                  </SelectContent>
                </Select>
                {!watch("size") && (
                  <p className="text-sm text-red-500 mt-1">Size is required</p>
                )}
              </div>

              {/* Lifespan */}
              <div>
                <Label htmlFor="lifespan">Lifespan *</Label>
                <Input
                  id="lifespan"
                  {...register("lifespan", {
                    required: "Lifespan is required",
                  })}
                />
                {errors.lifespan && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.lifespan.message}
                  </p>
                )}
              </div>

              {/* Temperament */}
              <div>
                <Label htmlFor="temperament">Temperament</Label>
                <Input id="temperament" {...register("temperament")} />
              </div>

              {/* Grooming */}
              <div>
                <Label htmlFor="grooming">Grooming</Label>
                <Input id="grooming" {...register("grooming")} />
              </div>

              {/* Exercise */}
              <div>
                <Label htmlFor="exercise">Exercise *</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("exercise", value, { shouldDirty: true })
                  }
                  value={watch("exercise") || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select exercise needs" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Very High">Very High</SelectItem>
                  </SelectContent>
                </Select>
                {!watch("exercise") && (
                  <p className="text-sm text-red-500 mt-1">
                    Exercise is required
                  </p>
                )}
              </div>

              {/* Diet */}
              <div>
                <Label htmlFor="diet">Diet *</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("diet", value, { shouldDirty: true })
                  }
                  value={watch("diet") || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="High-Protein">High-Protein</SelectItem>
                    <SelectItem value="Grain-Free">Grain-Free</SelectItem>
                    <SelectItem value="Raw">Raw</SelectItem>
                    <SelectItem value="Specialized">Specialized</SelectItem>
                  </SelectContent>
                </Select>
                {!watch("diet") && (
                  <p className="text-sm text-red-500 mt-1">Diet is required</p>
                )}
              </div>

              {/* Health Issues */}
              <div>
                <Label htmlFor="healthIssues">Health Issues</Label>
                <Input id="healthIssues" {...register("healthIssues")} />
              </div>

              {/* Energy Level */}
              <div>
                <Label htmlFor="energyLevel">Energy Level *</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("energyLevel", value, { shouldDirty: true })
                  }
                  value={watch("energyLevel") || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select energy level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
                {!watch("energyLevel") && (
                  <p className="text-sm text-red-500 mt-1">
                    Energy level is required
                  </p>
                )}
              </div>

              {/* Hypoallergenic */}
              <div>
                <Label htmlFor="hypoallergenic">Hypoallergenic *</Label>
                <Select
                  onValueChange={(value) =>
                    setValue("hypoallergenic", value, { shouldDirty: true })
                  }
                  value={String(watch("hypoallergenic"))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Yes</SelectItem>
                    <SelectItem value="false">No</SelectItem>
                  </SelectContent>
                </Select>
                {watch("hypoallergenic") === undefined && (
                  <p className="text-sm text-red-500 mt-1">
                    Hypoallergenic is required
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Breed Images *</Label>
                <Input
                  id="photo"
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
                  onClick={() => document.getElementById("photo")?.click()}
                  disabled={uploading || imagePreviews.length >= MAX_IMAGES}
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  {uploading ? "Uploading..." : "Upload Images"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  5MB image (JPEG, PNG)
                </p>
                {imagePreviews.length === 0 && (
                  <p className="text-sm text-red-500 text-center mt-1">
                    At least one image is required
                  </p>
                )}
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
                      <p>No images uploaded</p>
                    </div>
                  </div>
                )}
                {errorMessage && (
                  <p className="text-sm text-red-500 text-center">
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {breed ? "Saving..." : "Adding..."}
                  </span>
                ) : breed ? (
                  "Save Changes"
                ) : (
                  "Add Breed"
                )}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </form>
    </DialogContent>
  );
};

export default BreedForm;
