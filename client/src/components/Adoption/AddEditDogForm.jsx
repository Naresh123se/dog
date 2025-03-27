// components/AddEditDogForm.jsx
import React from "react";
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

export const AddEditDogForm = ({ dog, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: dog || {
      name: "",
      age: "",
      breed: "",
      location: "",
      shelter: "",
      bio: "",
      photo: "",
      gender: "male", // Default to 'male' instead of empty string
      size: "Medium", // Default to 'Medium' instead of empty string
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

  // Set form values when select changes
  const handleSelectChange = (name, value) => {
    setValue(name, value, { shouldValidate: true });
  };

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

            {/* Age field remains the same */}
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

              {/* Gender select - fixed */}
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
              {/* Breed select - fixed */}
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

              {/* Size select - fixed */}
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

            {/* Rest of the form fields remain the same */}
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
              <Label htmlFor="shelter">Shelter/Rescue *</Label>
              <Input
                id="shelter"
                {...register("shelter", { required: "Shelter is required" })}
                className={errors.shelter && "border-red-500"}
              />
              {errors.shelter && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shelter.message}
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

            <div>
              <Label htmlFor="photo">Photo URL *</Label>
              <Input
                id="photo"
                {...register("photo", {
                  required: "Photo is required",
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                    message: "Please enter a valid URL",
                  },
                })}
                placeholder="https://example.com/dog.jpg"
                className={errors.photo && "border-red-500"}
              />
              {errors.photo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{dog ? "Update" : "Add Dog"}</Button>
            </div>
          </ScrollArea>
        </form>
      </DialogContent>
    </Dialog>
  );
};
