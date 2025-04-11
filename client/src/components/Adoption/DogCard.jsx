import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Building2 } from "lucide-react";
import Contact from "./Contact";
import { useSelector } from "react-redux";

export const DogCard = ({ dog, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);

  const getAgeColor = (age) => {
    if (age <= 1) return "bg-blue-100 text-blue-800";
    if (age <= 7) return "bg-green-100 text-green-800";
    return "bg-purple-100 text-purple-800";
  };

  const user = useSelector((state) => state.auth?.user);
  const isOwner = dog?.breederName === user?._id;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer">
            <div className="relative">
              <div className="relative">
                {dog.photo && dog.photo.length > 0 ? (
                  <img
                    src={dog.photo[0].url}
                    alt={dog.name}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
                <div className="absolute top-0 left-0 right-0 flex justify-between p-4">
                  <Badge className={`${getAgeColor(dog.age)} shadow-md`}>
                    {dog.age <= 1 ? "Puppy" : dog.age <= 7 ? "Adult" : "Senior"}{" "}
                    ({dog.age} {dog.age === 1 ? "year" : "years"})
                  </Badge>
                  <Badge className="bg-white/80 text-gray-800 shadow-md">
                    {dog.size}
                  </Badge>
                </div>
              </div>

              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {dog.name}
                    </h2>
                    <p className="text-gray-600 text-sm">{dog.breed}</p>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {dog.gender}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-4 pt-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {dog.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {dog.breederName}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-2 line-clamp-3 italic">
                    "{dog.bio}"
                  </p>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex space-x-3">
                {user?.role === "breeder" && <Contact dogData={dog} />}

                {isOwner && (
                  <>
                    <Button
                      variant="outline"
                      className="flex-1 hover:bg-red-50 hover:border-red-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 hover:bg-blue-50 hover:border-blue-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit();
                      }}
                    >
                      Edit
                    </Button>
                  </>
                )}
              </CardFooter>
            </div>
          </Card>
        </DialogTrigger>

        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">
              Dog Registration Certificate
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="md:col-span-1">
              {dog.photo && dog.photo.length > 0 ? (
                <div className="space-y-4">
                  <img
                    src={dog.photo[0].url}
                    alt={dog.name}
                    className="w-full aspect-square object-cover rounded-md shadow-md"
                  />
                  {dog.photo[1] && (
                    <img
                      src={dog.photo[1].url}
                      alt={`${dog.name} additional`}
                      className="w-full aspect-square object-cover rounded-md shadow-md"
                    />
                  )}
                </div>
              ) : (
                <div className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded-md">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <div className="border rounded-md overflow-hidden">
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50 w-1/3">
                        Dog Name:
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {dog.name}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50 w-1/3">
                        Breeder:
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {dog.breederName || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                        Registration Date:
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {new Date(dog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                        Owner:
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {user?.name || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                        Pedigree No:
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {dog._id || "N/A"}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                        Phone:
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {user?.phone || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                        Date of Birth:
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {dog.age
                          ? `Approx. ${new Date().getFullYear() - dog.age}`
                          : "N/A"}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                        Address:
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {dog.location || "N/A"}
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                        Breed:
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {dog.breed}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                        Registry:
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        Local Pet Registry
                      </td>
                    </tr>

                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                        Sex:
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {dog.gender?.toUpperCase() || "N/A"}
                      </td>
               
                    </tr>

                    <tr className="border-b">
                      <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                        Color:
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {dog.color || "N/A"}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                        Notes:
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {dog.bio || "N/A"}
                      </td>
                    </tr>

                    <tr>
                      <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">
                        Size:
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {dog.size}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                {user?.role === "breeder" && <Contact dogData={dog} />}

                {isOwner && (
                  <>
                    <Button
                      variant="outline"
                      className="hover:bg-red-50 hover:border-red-300"
                      onClick={onDelete}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outline"
                      className="hover:bg-blue-50 hover:border-blue-300"
                      onClick={onEdit}
                    >
                      Edit
                    </Button>
                  </>
                )}
                <Button
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Example usage:
// <DogCard
//   dog={dogData}
//   onEdit={() => handleEdit(dogData._id)}
//   onDelete={() => handleDelete(dogData._id)}
// />
