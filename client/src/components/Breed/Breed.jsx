import { useState } from "react";
import BreedList from "./BreedList";
import {
  useGetAllBreedsQuery,
  useAddBreedMutation,
  useUpdateBreedMutation,
  useDeleteBreedMutation,
} from "@/app/slices/breedApiSlice";
import { toast } from "react-toastify";

const Breed = () => {
  const { data: breeds, isLoading, isError, refetch } = useGetAllBreedsQuery();
  const [addBreed] = useAddBreedMutation();
  const [updateBreed] = useUpdateBreedMutation();
  const [deleteBreed] = useDeleteBreedMutation();
  const [selectedBreed, setSelectedBreed] = useState(null);

  const handleAddBreed = async (newBreed) => {
    console.log(newBreed);
    try {
      await addBreed(newBreed).unwrap();
      toast.success("Breed added successfully");
      refetch();
    } catch (err) {
      toast.error("Failed to add breed");
      console.error("Failed to add breed:", err);
    }
  };

  const handleEditBreed = async (updatedBreed) => 
    {console.log(updateBreed)
    try {
      await updateBreed({
        id: updatedBreed._id, // Use ID from the updated breed
        data: updatedBreed, // Send the rest as data
      }).unwrap();
      toast.success("Breed updated successfully");
      // Update the selected breed if it's the one being edited
      if (selectedBreed && selectedBreed._id === updatedBreed._id) {
        setSelectedBreed(updatedBreed);
      }
      refetch();
    } catch (err) {
      toast.error("Failed to update breed");
      console.error("Failed to update breed:", err);
    }
  };

  const handleDeleteBreed = async (id) => {
    try {
      await deleteBreed(id).unwrap();
      toast.success("Breed deleted successfully");
      refetch();
      if (selectedBreed?._id === id) {
        setSelectedBreed(null);
      }
    } catch (err) {
      toast.error("Failed to delete breed");
      console.error("Failed to delete breed:", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading breeds</div>;

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
          onAddBreed={handleAddBreed}
          onEditBreed={handleEditBreed}
          onDeleteBreed={handleDeleteBreed}
        />
      </main>
    </div>
  );
};

export default Breed;
