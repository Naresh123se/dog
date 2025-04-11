import { useState } from "react";
import {
  useGetAllBreedsQuery,
  useAddBreedMutation,
  useUpdateBreedMutation,
  useDeleteBreedMutation,
} from "@/app/slices/breedApiSlice";
import { toast } from "react-toastify";
import BreedList from "./BreedList";

const Breed = () => {
  const { data: breeds, isLoading, isError, refetch } = useGetAllBreedsQuery();
  const [addBreed, { isLoading: addLoading }] = useAddBreedMutation();
  const [updateBreed, { isLoading: updateLoading }] = useUpdateBreedMutation();
  const [deleteBreed, { isLoading: deleteLoading }] = useDeleteBreedMutation();
  const [selectedBreed, setSelectedBreed] = useState(null);

  const handleAddBreed = async (newBreed) => {
    try {
      await addBreed(newBreed).unwrap();
      toast.success("Breed added successfully");
      refetch();
      return true; // Return success status
    } catch (err) {
      toast.error("Failed to add breed");
      console.error("Failed to add breed:", err);
      return false; // Return failure status
    }
  };

  const handleEditBreed = async (updatedBreed) => {
    try {
      await updateBreed({
        id: updatedBreed._id,
        data: updatedBreed,
      }).unwrap();
      toast.success("Breed updated successfully");
      if (selectedBreed && selectedBreed._id === updatedBreed._id) {
        setSelectedBreed(updatedBreed);
      }
      refetch();
      return true;
    } catch (err) {
      toast.error("Failed to update breed");
      console.error("Failed to update breed:", err);
      return false;
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
      return true;
    } catch (err) {
      toast.error("Failed to delete breed");
      console.error("Failed to delete breed:", err);
      return false;
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
          deleteLoading={deleteLoading}
          addLoading={addLoading}
        />
      </main>
    </div>
  );
};

export default Breed;
