import React, { useState } from "react";
import BreedCard from "./BreedCard";
import BreedForm from "./BreedForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import BreedProfile from "./BreedProfile";

const BreedList = ({
  breeds,
  onSelectBreed,
  selectedBreed,
  onAddBreed,
  onEditBreed,
}) => {
  const [filters, setFilters] = useState({
    size: "",
    energyLevel: "",
    hypoallergenic: "",
  });
  const [sortBy, setSortBy] = useState("alphabetical");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value === "all" ? "" : value }));
  };

  const filteredBreeds = breeds
    .filter(
      (breed) =>
        (!filters.size || breed.size === filters.size) &&
        (!filters.energyLevel || breed.energyLevel === filters.energyLevel) &&
        (!filters.hypoallergenic ||
          breed.hypoallergenic.toString() === filters.hypoallergenic)
    )
    .sort((a, b) => {
      if (sortBy === "alphabetical") return a.name.localeCompare(b.name);
      return 0; // Add popularity sorting logic if needed
    });

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Filter Breeds</h2>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Breed
              </Button>
            </DialogTrigger>
            <BreedForm
              onSubmit={onAddBreed}
              onClose={() => setIsAddOpen(false)}
            />
          </Dialog>
        </div>
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size
            </label>
            <Select
              onValueChange={(value) => handleFilterChange("size", value)}
            >
              <SelectTrigger className="w-48 bg-white">
                <SelectValue placeholder="All Sizes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sizes</SelectItem>
                <SelectItem value="Small">Small</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Energy Level
            </label>
            <Select
              onValueChange={(value) =>
                handleFilterChange("energyLevel", value)
              }
            >
              <SelectTrigger className="w-48 bg-white">
                <SelectValue placeholder="All Energy Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Energy Levels</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hypoallergenic
            </label>
            <Select
              onValueChange={(value) =>
                handleFilterChange("hypoallergenic", value)
              }
            >
              <SelectTrigger className="w-48 bg-white">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="true">Hypoallergenic</SelectItem>
                <SelectItem value="false">Non-Hypoallergenic</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <Select onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-white">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alphabetical">A-Z</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {filteredBreeds.length}{" "}
            {filteredBreeds.length === 1 ? "Breed" : "Breeds"} Found
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBreeds.map((breed) => (
              <BreedCard
                key={breed.id}
                breed={breed}
                onSelect={() => onSelectBreed(breed)}
                onEdit={(updatedBreed) => {
                  onEditBreed(updatedBreed);
                  if (selectedBreed?.id === updatedBreed.id) {
                    onSelectBreed(updatedBreed);
                  }
                }}
              />
            ))}
          </div>
        </div>

        {selectedBreed && (
          <div className="lg:w-1/2">
            <BreedProfile
              breed={selectedBreed}
              onClose={() => onSelectBreed(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BreedList;
