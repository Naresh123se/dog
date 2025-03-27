import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import BreedForm from "./BreedForm";

const BreedCard = ({ breed, onSelect, onEdit }) => {
  const [isEditOpen, setIsEditOpen] = React.useState(false);

  return (
    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
      <Card
        className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 rounded-xl overflow-hidden group relative"
        onClick={onSelect}
      >
        <div className="relative">
          <CardHeader className="p-0">
            <img
              src={breed.image}
              alt={breed.name}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
          </CardHeader>
          <DialogTrigger asChild>
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
            {breed.temperament.split(", ").map((trait, index) => (
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

      <BreedForm
        breed={breed}
        onSubmit={(data) => {
          onEdit(data);
          setIsEditOpen(false);
        }}
        onClose={() => setIsEditOpen(false)}
      />
    </Dialog>
  );
};

export default BreedCard;
