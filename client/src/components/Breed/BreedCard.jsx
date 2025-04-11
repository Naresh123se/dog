import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import BreedForm from "./BreedForm";
import { useSelector } from "react-redux";

const BreedCard = ({ breed, onSelect, onEdit, isLoading }) => {
  const [isEditOpen, setIsEditOpen] = React.useState(false);

  const handleSubmit = async (updatedBreed) => {
    const success = await onEdit({
      ...updatedBreed,
      _id: breed._id,
    });
    if (success) {
      setIsEditOpen(false);
    }
  };

  const user = useSelector((state) => state.auth?.user);
  console.log(user)
  const isOwner = breed?.owner?._id === user?._id;
  console.log(isOwner)

  return (
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
      <Card
        className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 rounded-xl overflow-hidden group relative"
        onClick={() => onSelect(breed)}
      >
        <div className="relative">
          <CardHeader className="p-0">
            {breed.images && breed.images.length > 0 ? (
              <img
                src={breed.images[0].url}
                alt={breed.title}
                className="w-full h-56 object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
          </CardHeader>
          <DialogTrigger asChild>
            {isOwner && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditOpen(true);
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
          </DialogTrigger>
        </div>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-bold text-gray-800 mb-1">
            {breed.name}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {breed.size}
            </span>
            <span>•</span>
            <span>{breed.lifespan}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1">
            {breed.temperament?.split(", ").map((trait, index) => (
              <span
                key={index}
                className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
              >
                {trait}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      {isEditOpen && (
        <BreedForm
          breed={breed}
          onSubmit={handleSubmit}
          onClose={() => setIsEditOpen(false)}
          isLoading={isLoading}
        />
      )}
    </Dialog>
  );
};

export default BreedCard;
