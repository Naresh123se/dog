import { useNavigate } from "react-router-dom";
import { useGetAllDogsQuery } from "@/app/slices/dogApiSlice";

function PetCard({ photo, name, breed, age }) {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate("./adoption");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 min-w-[280px] max-w-[280px]">
      <div className="relative">
        <img
          src={
            photo && photo.length > 0
              ? photo[0].url
              : "/api/placeholder/280/200"
          }
          alt={name}
          className="w-full h-56 object-cover"
        />
        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 m-2 rounded-full text-sm font-medium">
          Available
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
        <div className="space-y-1">
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Breed:</span> {breed}
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-medium">Age:</span> {age}
          </p>
        </div>
        <button
          onClick={handleLearnMore}
          className="mt-4 bg-primary text-white px-4 py-2 rounded-full w-full hover:bg-opacity-90 transition duration-300 font-medium"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

export function AvailablePets() {
  const { data, isLoading, isError, error } = useGetAllDogsQuery();

  // Extract pets from the response data
  const pets = data?.dogs || [];

  return (
    <section id="dogs" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Available Pets
        </h2>

        {isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading available pets...</p>
          </div>
        )}

        {isError && (
          <div className="text-center py-8">
            <p className="text-red-500">
              Error: {error?.data?.message || "Failed to fetch pets"}
            </p>
          </div>
        )}

        {!isLoading && !isError && pets.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No pets available at the moment.</p>
          </div>
        )}

        {!isLoading && !isError && pets.length > 0 && (
          <div className="relative">
            <div className="overflow-x-auto pb-4 scroll-smooth">
              <div className="flex gap-6 w-max px-8">
                {pets.map((pet) => (
                  <PetCard
                    key={pet._id}
                    photo={pet.photo}
                    name={pet.name}
                    breed={pet.breed}
                    age={pet.age}
                  />
                ))}
              </div>
            </div>
            {/* Left fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
            {/* Right fade effect */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
          </div>
        )}
      </div>
    </section>
  );
}
