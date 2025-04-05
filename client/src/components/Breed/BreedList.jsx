import React, { useState } from "react";
import BreedCard from "./BreedCard";
import BreedForm from "./BreedForm";
import { Button } from "../ui/button";
import { Trash2, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Dialog, DialogTrigger } from "../ui/dialog";
import BreedProfile from "./BreedProfile";

const BreedList = ({
  breeds,
  onSelectBreed,
  selectedBreed,
  onAddBreed,
  onEditBreed,
  onDeleteBreed,
}) => {
  // Extract the breeds array from the response object
  const breedsArray = Array.isArray(breeds)
    ? breeds
    : breeds?.breeds?.length
    ? breeds.breeds
    : [];

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

  const filteredBreeds = breedsArray
    .filter(
      (breed) =>
        (!filters.size || breed.size === filters.size) &&
        (!filters.energyLevel || breed.energyLevel === filters.energyLevel) &&
        (filters.hypoallergenic === "" ||
          String(!!breed.hypoallergenic) === filters.hypoallergenic)
    )
    .sort((a, b) => {
      if (sortBy === "alphabetical")
        return (a.name || "").localeCompare(b.name || "");
      return 0; // Add popularity sort logic here if needed
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
              onSubmit={(newBreed) => {
                onAddBreed?.(newBreed);
                setIsAddOpen(false);
              }}
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
            <Select onValueChange={setSortBy} defaultValue="alphabetical">
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
        <div className="w-full lg:flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {filteredBreeds.length}{" "}
            {filteredBreeds.length === 1 ? "Breed" : "Breeds"} Found
          </h2>

          {breedsArray.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No Breeds Available
              </h3>
              <p className="text-gray-500 max-w-md">
                There are no dog breeds in the database yet. Click "Add Breed"
                to create the first one.
              </p>
            </div>
          ) : filteredBreeds.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No Results Found
              </h3>
              <p className="text-gray-500">
                No breeds match your current filter settings. Try adjusting your
                filters.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() =>
                  setFilters({
                    size: "",
                    energyLevel: "",
                    hypoallergenic: "",
                  })
                }
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBreeds.map((breed) => (
                <div
                  key={breed._id || Math.random().toString()}
                  className="relative group"
                >
                  <BreedCard
                    breed={breed}
                    onSelect={() => onSelectBreed?.(breed)}
                    onEdit={(updatedBreed) => {
                      console.log(
                        "Bnnn:",
                        updatedBreed
                      );
                      // Make sure we're passing the complete updated breed with its ID
                      onEditBreed?.(updatedBreed);
                    }}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white backdrop-blur-sm rounded-full p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          `Are you sure you want to delete ${
                            breed.name || "this breed"
                          }?`
                        )
                      ) {
                        onDeleteBreed?.(breed._id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedBreed && (
          <div className="lg:w-1/2">
            <BreedProfile
              breed={selectedBreed}
              onClose={() => onSelectBreed?.(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BreedList;
