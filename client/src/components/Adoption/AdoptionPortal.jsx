import React, { useState, useMemo } from "react";
import { DogCard } from "./DogCard";
import { SearchFilters } from "./SearchFilters";
import { AddEditDogForm } from "./AddEditDogForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  useAddDogMutation,
  useGetAllDogsQuery,
  useUpdateDogMutation,
} from "@/app/slices/dogApiSlice";
import { toast } from "react-toastify";

const AdoptionPortal = () => {
  const {
    data: dogsResponse,
    isLoading: isFetching,
    isError,
    refetch,
  } = useGetAllDogsQuery();
  const [showForm, setShowForm] = useState(false);
  const [editDog, setEditDog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    breed: "",
    age: "",
    gender: "",
    size: "",
    location: "",
  });

  const [addDog, { isLoading: isAdding }] = useAddDogMutation();
  const [updateDog, { isLoading: isUpdating }] = useUpdateDogMutation();

  // Extract the dogs array from the response
  const dogsData = useMemo(() => {
    if (
      !dogsResponse ||
      !dogsResponse.success ||
      !dogsResponse.dogs ||
      !Array.isArray(dogsResponse.dogs)
    ) {
      return [];
    }
    return dogsResponse.dogs;
  }, [dogsResponse]);

  // Normalize the data structure - map _id to id for consistency
  const normalizedDogsData = useMemo(() => {
    if (dogsData.length === 0) {
      return [];
    }

    return dogsData.map((dog) => ({
      ...dog,
      id: dog._id, // Map _id to id for component compatibility
      age: Number(dog.age), // Ensure age is a number for filtering
    }));
  }, [dogsData]);

  const filteredDogs = useMemo(() => {
    // Check if normalizedDogsData is valid
    if (normalizedDogsData.length === 0) {
      return [];
    }

    let results = [...normalizedDogsData];

    if (searchTerm) {
      results = results.filter(
        (dog) =>
          dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dog.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dog.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.breed) {
      results = results.filter((dog) => dog.breed === filters.breed);
    }

    if (filters.age) {
      if (filters.age === "puppy") {
        results = results.filter((dog) => dog.age <= 1);
      } else if (filters.age === "adult") {
        results = results.filter((dog) => dog.age > 1 && dog.age <= 7);
      } else if (filters.age === "senior") {
        results = results.filter((dog) => dog.age > 7);
      }
    }

    if (filters.gender) {
      results = results.filter((dog) => dog.gender === filters.gender);
    }

    if (filters.size) {
      results = results.filter((dog) => dog.size === filters.size);
    }

    if (filters.location) {
      results = results.filter((dog) =>
        dog.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    return results;
  }, [normalizedDogsData, searchTerm, filters]);

  const handleSubmit = async (data) => {
    try {
      if (editDog) {
        // Update existing dog - make sure to use _id for the API
        const updateData = { ...data, _id: editDog._id };
        await updateDog(updateData).unwrap();
        toast.success("Dog updated successfully");
      } else {
        // Add new dog
        await addDog(data).unwrap();
        toast.success("Dog added successfully");
      }
      refetch();
      setShowForm(false);
    } catch (error) {
      console.error("Error processing dog:", error);
      toast.error(error?.data?.message || "Failed to process dog entry");
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      breed: "",
      age: "",
      gender: "",
      size: "",
      location: "",
    });
    setSearchTerm("");
  };

  // Get unique breeds from the data for filter options
  const breedOptions = useMemo(() => {
    if (!normalizedDogsData.length) return [];
    const breeds = [...new Set(normalizedDogsData.map((dog) => dog.breed))];
    return breeds.sort();
  }, [normalizedDogsData]);

  if (isError) {
    return (
      <div className="container mx-auto p-4 md:p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Error loading dogs data
        </h2>
        <Button variant="outline" className="mt-4" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  // Handle empty data state
  if (!isFetching && (!dogsData || dogsData.length === 0)) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Find Your Perfect Canine Companion
            </h1>
            <p className="text-gray-600 mt-2">
              Browse our selection of dogs waiting for their forever homes
            </p>
          </div>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setEditDog(null);
              setShowForm(true);
            }}
            disabled={isAdding || isUpdating}
          >
            Add New Dog
          </Button>
        </div>
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            No dogs available
          </h3>
          <p className="mt-1 text-gray-500">
            There are currently no dogs in the database. Add a new dog to get
            started.
          </p>
        </div>

        {showForm && (
          <AddEditDogForm
            dog={editDog}
            onClose={() => setShowForm(false)}
            onSubmit={handleSubmit}
            isLoading={isAdding || isUpdating}
          />
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Find Your Perfect Canine Companion
          </h1>
          <p className="text-gray-600 mt-2">
            Browse our selection of dogs waiting for their forever homes
          </p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            setEditDog(null);
            setShowForm(true);
          }}
          disabled={isAdding || isUpdating}
        >
          Add New Dog
        </Button>
      </div>

      <div className="mb-8">
        <div className="relative mb-4">
          <Input
            placeholder="Search by name, breed, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 py-2 rounded-lg"
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <SearchFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          breedOptions={breedOptions}
        />

        {(filters.breed ||
          filters.age ||
          filters.gender ||
          filters.size ||
          filters.location) && (
          <div className="flex items-center mt-4 gap-2 flex-wrap">
            <p className="text-sm text-gray-600">Active filters:</p>
            {filters.breed && (
              <Badge variant="outline" className="flex items-center gap-1">
                Breed: {filters.breed}
                <button
                  onClick={() => handleFilterChange("breed", "")}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.age && (
              <Badge variant="outline" className="flex items-center gap-1">
                Age: {filters.age}
                <button
                  onClick={() => handleFilterChange("age", "")}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.gender && (
              <Badge variant="outline" className="flex items-center gap-1">
                Gender: {filters.gender}
                <button
                  onClick={() => handleFilterChange("gender", "")}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.size && (
              <Badge variant="outline" className="flex items-center gap-1">
                Size: {filters.size}
                <button
                  onClick={() => handleFilterChange("size", "")}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </Badge>
            )}
            {filters.location && (
              <Badge variant="outline" className="flex items-center gap-1">
                Location: {filters.location}
                <button
                  onClick={() => handleFilterChange("location", "")}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </Badge>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        )}
      </div>

      {isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-96 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Available Dogs{" "}
              {filteredDogs.length > 0 && `(${filteredDogs.length})`}
            </h2>
            {dogsResponse?.count > 0 && (
              <p className="text-gray-600">
                Total in database: {dogsResponse.count}
              </p>
            )}
          </div>

          {filteredDogs.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No dogs found
              </h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDogs.map((dog) => (
                <DogCard
                  key={dog._id}
                  dog={dog}
                  onEdit={() => {
                    setEditDog(dog);
                    setShowForm(true);
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}

      {showForm && (
        <AddEditDogForm
          dog={editDog}
          onClose={() => setShowForm(false)}
          onSubmit={handleSubmit}
          isLoading={isAdding || isUpdating}
        />
      )}
    </div>
  );
};

export default AdoptionPortal;
