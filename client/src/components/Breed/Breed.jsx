import React, { useState } from "react";
import BreedList from "./BreedList";
import { dogBreeds as initialBreeds } from "./BreedData";

const Breed = () => {
  const [breeds, setBreeds] = useState(initialBreeds);
  const [selectedBreed, setSelectedBreed] = useState(null);

  const addBreed = (newBreed) => {
    setBreeds((prev) => [...prev, { ...newBreed, id: prev.length + 1 }]);
  };

  const editBreed = (updatedBreed) => {
    setBreeds((prev) =>
      prev.map((b) => (b.id === updatedBreed.id ? updatedBreed : b))
    );
    if (selectedBreed?.id === updatedBreed.id) setSelectedBreed(updatedBreed);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Dog Breed Directory
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 px-4">
        <BreedList
          breeds={breeds}
          onSelectBreed={setSelectedBreed}
          selectedBreed={selectedBreed}
          onAddBreed={addBreed}
          onEditBreed={editBreed}
        />
      </main>
    </div>
  );
};

export default Breed;
