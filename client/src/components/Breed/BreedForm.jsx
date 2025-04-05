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
import { useEffect } from "react";

const BreedForm = ({ breed, onSubmit, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isDirty },
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
      image: "",
    }
  });

  // Initialize form with breed data when component mounts or breed changes
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
        image: breed.image || "",
      });
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
        image: "",
      });
    }
  }, [breed, reset]);

  const onFormSubmit = (data) => {
    const formattedData = {
      ...data,
      _id: breed?._id,
      hypoallergenic: data.hypoallergenic === true || data.hypoallergenic === "true",
    };
    onSubmit(formattedData);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{breed ? "Edit Breed" : "Add New Breed"}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-4 pr-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="origin">Origin</Label>
              <Input
                id="origin"
                {...register("origin")}
              />
            </div>
            <div>
              <Label htmlFor="size">Size</Label>
              <Select
                onValueChange={(value) => setValue("size", value)}
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
            </div>
            <div>
              <Label htmlFor="lifespan">Lifespan</Label>
              <Input
                id="lifespan"
                {...register("lifespan")}
              />
            </div>
            <div>
              <Label htmlFor="temperament">Temperament</Label>
              <Input
                id="temperament"
                {...register("temperament")}
              />
            </div>
            <div>
              <Label htmlFor="grooming">Grooming</Label>
              <Input
                id="grooming"
                {...register("grooming")}
              />
            </div>
            <div>
              <Label htmlFor="exercise">Exercise</Label>
              <Input
                id="exercise"
                {...register("exercise")}
              />
            </div>
            <div>
              <Label htmlFor="diet">Diet</Label>
              <Input
                id="diet"
                {...register("diet")}
              />
            </div>
            <div>
              <Label htmlFor="healthIssues">Health Issues</Label>
              <Input
                id="healthIssues"
                {...register("healthIssues")}
              />
            </div>
            <div>
              <Label htmlFor="energyLevel">Energy Level</Label>
              <Select
                onValueChange={(value) => setValue("energyLevel", value)}
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
            </div>
            <div>
              <Label htmlFor="hypoallergenic">Hypoallergenic</Label>
              <Select
                onValueChange={(value) => setValue("hypoallergenic", value)}
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
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                {...register("image")}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={!isDirty}>
                {breed ? "Update" : "Add"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        </ScrollArea>
      </form>
    </DialogContent>
  );
};

export default BreedForm;