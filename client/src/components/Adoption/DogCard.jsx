import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2 } from "lucide-react";
import Contact from "./Contact";
import { useSelector } from "react-redux";

export const DogCard = ({ dog, onEdit }) => {
  const getAgeColor = (age) => {
    if (age <= 1) return "bg-blue-100 text-blue-800";
    if (age <= 7) return "bg-green-100 text-green-800";
    return "bg-purple-100 text-purple-800";
  };
  const user = useSelector((state) => state.auth.user?.role);

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 group">
      <div className="relative">
        <div className="relative">
          {dog.photo && dog.photo.length > 0 ? (
            <img
              src={dog.photo[0].url}
              alt={dog.title}
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
              {dog.age <= 1 ? "Puppy" : dog.age <= 7 ? "Adult" : "Senior"} (
              {dog.age} {dog.age === 1 ? "year" : "years"})
            </Badge>
            <Badge className="bg-white/80 text-gray-800 shadow-md">
              {dog.size}
            </Badge>
          </div>
        </div>

        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{dog.name}</h2>
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
              <span className="text-sm text-gray-700">{dog.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-700">{dog.shelter}</span>
            </div>
            <p className="text-gray-600 mt-2 line-clamp-3 italic">
              "{dog.bio}"
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex space-x-3">
          {user === "breeder" && <Contact dogData={dog} />}

          <Button
            variant="outline"
            className="flex-1 hover:bg-blue-50 hover:border-blue-300"
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            className="flex-1 hover:bg-blue-50 hover:border-blue-300"
            onClick={onEdit}
          >
            Edit
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
