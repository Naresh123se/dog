import { useForm } from "react-hook-form";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { ScrollArea } from "../ui/scroll-area";

const BreedForm = ({ breed, onSubmit, onClose }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: breed || {
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
    },
  });

  const onFormSubmit = (data) => {
    const formattedData = {
      ...data,
      id: breed?.id || Date.now(), // Use existing ID or generate new
      hypoallergenic: data.hypoallergenic === "true",
    };
    onSubmit(formattedData);
    onClose();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{breed ? "Edit Breed" : "Add New Breed"}</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <ScrollArea className="h-[calc(100vh-100px)]">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name", { required: true })} />
          </div>
          <div>
            <Label htmlFor="origin">Origin</Label>
            <Input id="origin" {...register("origin")} />
          </div>
          <div>
            <Label htmlFor="size">Size</Label>
            <Select
              onValueChange={(value) => setValue("size", value)}
              defaultValue={breed?.size || ""}
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
            <Input id="lifespan" {...register("lifespan")} />
          </div>
          <div>
            <Label htmlFor="temperament">Temperament</Label>
            <Input id="temperament" {...register("temperament")} />
          </div>
          <div>
            <Label htmlFor="grooming">Grooming</Label>
            <Input id="grooming" {...register("grooming")} />
          </div>
          <div>
            <Label htmlFor="exercise">Exercise</Label>
            <Input id="exercise" {...register("exercise")} />
          </div>
          <div>
            <Label htmlFor="diet">Diet</Label>
            <Input id="diet" {...register("diet")} />
          </div>
          <div>
            <Label htmlFor="healthIssues">Health Issues</Label>
            <Input id="healthIssues" {...register("healthIssues")} />
          </div>
          <div>
            <Label htmlFor="energyLevel">Energy Level</Label>
            <Select
              onValueChange={(value) => setValue("energyLevel", value)}
              defaultValue={breed?.energyLevel || ""}
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
              defaultValue={breed?.hypoallergenic.toString() || "false"}
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
            <Input id="image" {...register("image")} />
          </div>
          <div className="flex gap-2">
            <Button type="submit">{breed ? "Update" : "Add"}</Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </ScrollArea>
      </form>
    </DialogContent>
  );
};

export default BreedForm;
