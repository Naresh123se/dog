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
import { ImageIcon, X, Shield } from "lucide-react";
import { toast } from "react-toastify";

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
      // Dog Information
      name: "",
      age: "",
      breed: "",
      location: "",
      price: "",
      bio: "",
      photos: [],
      gender: "male",
      size: "Medium",
      microchip: "",
      color: "",
      dob: "",

      // Owner Information
      ownerName: "",
      ownerAddress: "",
      regDate: "",
      regNumber: "",
      breeder: "",

      // Parent Information
      sireName: "",
      sireRegNumber: "",
      sireColor: "",
      damName: "",
      damRegNumber: "",
      damColor: "",

      // Grandparents
      sireGrandfather: "",
      sireGrandfatherReg: "",
      sireGrandmother: "",
      sireGrandmotherReg: "",
      damGrandfather: "",
      damGrandfatherReg: "",
      damGrandfatherColor: "",
      damGrandmother: "",
      damGrandmotherReg: "",
      damGrandmotherColor: "",
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

  const handleSelectChange = (name, value) => {
    setValue(name, value, { shouldValidate: true });
  };

  useEffect(() => {
    if (dog) {
      reset({
        ...dog,
        photos: dog.photos || [],
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
        microchip: "",
        color: "",
        dob: "",
        ownerName: "",
        ownerAddress: "",
        regDate: "",
        regNumber: "",
        breeder: "",
        sireName: "",
        sireRegNumber: "",
        sireColor: "",
        damName: "",
        damRegNumber: "",
        damColor: "",
        sireGrandfather: "",
        sireGrandfatherReg: "",
        sireGrandmother: "",
        sireGrandmotherReg: "",
        damGrandfather: "",
        damGrandfatherReg: "",
        damGrandfatherColor: "",
        damGrandmother: "",
        damGrandmotherReg: "",
        damGrandmotherColor: "",
      });
      setImagePreviews([]);
    }
  }, [dog, reset]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-yellow-400 relative">
              <Shield size={24} />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-yellow-400">
                IKC
              </div>
            </div>
            <DialogTitle className="text-2xl">
              {dog ? "Edit Dog Profile" : "Add New Dog"}
            </DialogTitle>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <ScrollArea className="h-[calc(100vh-200px)]">
            {/* Section 1: Dog Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">
                Dog Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

                <div>
                  <Label htmlFor="dogName">Registered Name</Label>
                  <Input id="dogName" {...register("dogName")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" {...register("dob")} />
                </div>

                <div>
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={watch("gender")}
                    onValueChange={(value) =>
                      handleSelectChange("gender", value)
                    }
                  >
                    <SelectTrigger
                      className={errors.gender && "border-red-500"}
                    >
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label htmlFor="breed">Breed *</Label>
                  <Select
                    value={watch("breed")}
                    onValueChange={(value) =>
                      handleSelectChange("breed", value)
                    }
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

                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" {...register("color")} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    {...register("location", {
                      required: "Location is required",
                    })}
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
              </div>

              <div className="mb-4">
                <Label htmlFor="microchip">Microchip Number</Label>
                <Input id="microchip" {...register("microchip")} />
              </div>

              <div className="mb-4">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  {...register("bio")}
                  rows={3}
                  placeholder="Tell us about this dog's personality, habits, etc."
                />
              </div>

              {/* Image Upload Section */}
              <div className="space-y-2 mb-4">
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
              <div className="space-y-2 mb-6">
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

              {/* Owner Information */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-blue-800 mb-4 border-b pb-2">
                  Owner Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input id="ownerName" {...register("ownerName")} />
                  </div>
                  <div>
                    <Label htmlFor="ownerAddress">Owner Address</Label>
                    <Input id="ownerAddress" {...register("ownerAddress")} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="regDate">Registration Date</Label>
                    <Input id="regDate" type="date" {...register("regDate")} />
                  </div>
                  <div>
                    <Label htmlFor="regNumber">Registration Number</Label>
                    <Input id="regNumber" {...register("regNumber")} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="breeder">Breeder</Label>
                  <Input id="breeder" {...register("breeder")} />
                </div>
              </div>
            </div>

            {/* Section 2: Parent Information */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-blue-800 mb-4 border-b pb-2">
                Parent Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sire (Father) Information */}
                <div className="border rounded p-4">
                  <h3 className="text-lg font-bold text-blue-800 mb-4">
                    Sire (Father)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sireName">Sire Name</Label>
                      <Input id="sireName" {...register("sireName")} />
                    </div>
                    <div>
                      <Label htmlFor="sireRegNumber">Registration Number</Label>
                      <Input
                        id="sireRegNumber"
                        {...register("sireRegNumber")}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sireColor">Color</Label>
                      <Input id="sireColor" {...register("sireColor")} />
                    </div>

                    {/* Sire's Parents */}
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-bold text-blue-700 mb-2">
                        Sire's Parents
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <Label htmlFor="sireGrandfather">
                            Grandfather Name
                          </Label>
                          <Input
                            id="sireGrandfather"
                            {...register("sireGrandfather")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="sireGrandfatherReg">
                            Grandfather Reg. Number
                          </Label>
                          <Input
                            id="sireGrandfatherReg"
                            {...register("sireGrandfatherReg")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="sireGrandmother">
                            Grandmother Name
                          </Label>
                          <Input
                            id="sireGrandmother"
                            {...register("sireGrandmother")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="sireGrandmotherReg">
                            Grandmother Reg. Number
                          </Label>
                          <Input
                            id="sireGrandmotherReg"
                            {...register("sireGrandmotherReg")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dam (Mother) Information */}
                <div className="border rounded p-4">
                  <h3 className="text-lg font-bold text-blue-800 mb-4">
                    Dam (Mother)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="damName">Dam Name</Label>
                      <Input id="damName" {...register("damName")} />
                    </div>
                    <div>
                      <Label htmlFor="damRegNumber">Registration Number</Label>
                      <Input id="damRegNumber" {...register("damRegNumber")} />
                    </div>
                    <div>
                      <Label htmlFor="damColor">Color</Label>
                      <Input id="damColor" {...register("damColor")} />
                    </div>

                    {/* Dam's Parents */}
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-bold text-blue-700 mb-2">
                        Dam's Parents
                      </h4>
                      <div className="space-y-2">
                        <div>
                          <Label htmlFor="damGrandfather">
                            Grandfather Name
                          </Label>
                          <Input
                            id="damGrandfather"
                            {...register("damGrandfather")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="damGrandfatherReg">
                            Grandfather Reg. Number
                          </Label>
                          <Input
                            id="damGrandfatherReg"
                            {...register("damGrandfatherReg")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="damGrandfatherColor">
                            Grandfather Color
                          </Label>
                          <Input
                            id="damGrandfatherColor"
                            {...register("damGrandfatherColor")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="damGrandmother">
                            Grandmother Name
                          </Label>
                          <Input
                            id="damGrandmother"
                            {...register("damGrandmother")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="damGrandmotherReg">
                            Grandmother Reg. Number
                          </Label>
                          <Input
                            id="damGrandmotherReg"
                            {...register("damGrandmotherReg")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="damGrandmotherColor">
                            Grandmother Color
                          </Label>
                          <Input
                            id="damGrandmotherColor"
                            {...register("damGrandmotherColor")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
