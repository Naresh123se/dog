// components/SearchFilters.jsx
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const SearchFilters = ({ filters, onFilterChange }) => {
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-gray-50 rounded-lg border">
      <div>
        <Label>Location</Label>
        <Input
          placeholder="City or ZIP"
          value={filters.location}
          onChange={(e) => onFilterChange("location", e.target.value)}
        />
      </div>
      <div>
        <Label>Breed</Label>
        <Select
          value={filters.breed}
          onValueChange={(value) => onFilterChange("breed", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="All breeds" />
          </SelectTrigger>
          <SelectContent>
            {breeds.map((breed) => (
              <SelectItem key={breed} value={breed}>
                {breed}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Age</Label>
        <Select
          value={filters.age}
          onValueChange={(value) => onFilterChange("age", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="puppy">Puppy (0-1 year)</SelectItem>
            <SelectItem value="adult">Adult (1-7 years)</SelectItem>
            <SelectItem value="senior">Senior (7+ years)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Gender</Label>
        <Select
          value={filters.gender}
          onValueChange={(value) => onFilterChange("gender", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Size</Label>
        <Select
          value={filters.size}
          onValueChange={(value) => onFilterChange("size", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Small">Small</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Large">Large</SelectItem>
            <SelectItem value="X-Large">X-Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
